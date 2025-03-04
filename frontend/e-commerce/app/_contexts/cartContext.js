"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading, setUser } = useUser();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

//causes and error without type of window is undefined
  const getLocalCart = () => {
    if (typeof window !== "undefined") {
      const localCart = localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    }
    return [];
  };

  // Save local cart to localStorage
  const saveLocalCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    const syncCart = () => {
      if (loading) return;
      if (user) {
        setCart(user.cart?.products || []);
        setTotalNumberOfItems(user.cart?.totalNumberOfItems || 0);
        setTotalPrice(user.cart?.totalPrice || 0);
      } else {
        //if no user
        const localCart = getLocalCart();
        setCart(localCart);
        const totalItems = localCart.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const totalPrice = localCart.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        setTotalNumberOfItems(totalItems);
        setTotalPrice(totalPrice);
      }
    };

    syncCart();
  }, [loading, user]);
  //calculating number of items and totalPrice in case there's no user
  useEffect(() => {
    const calculateTotals = () => {
      const totalPrice = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      const totalItems = cart.reduce(
        (count, item) => count + (item.quantity || 0),
        0
      );

      setTotalPrice(totalPrice);
      setTotalNumberOfItems(totalItems);
    };

    if (!user) {
      calculateTotals();
    }
  }, [cart]);

  //merge local cart with api cart
  const mergeLocalCartToApiCart = async () => {
    if (!user || loading) return;

    const localCart = getLocalCart();
    if (localCart.length === 0) return;
    //api cart
    const userProducts = user.cart.products.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const combinedProductsMap = new Map();

    //api cart map
    userProducts.forEach((product) => {
      combinedProductsMap.set(product.productId, product);
    });

    //merge both carts
    localCart.forEach((item) => {
      if (combinedProductsMap.has(item.productId)) {
        const existingProduct = combinedProductsMap.get(item.productId);
        combinedProductsMap.set(item.productId, {
          productId: item.productId,
          quantity: existingProduct.quantity + item.quantity,
        });
      } else {
        combinedProductsMap.set(item.productId, {
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    });

    const products = Array.from(combinedProductsMap.values());

    try {
      setLoadingCart(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart/products`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ override: true, products }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser((prevUser) => ({
          ...prevUser,
          cart: data,
        }));
        localStorage.removeItem("cart");
        toast.success("Local cart successfully merged with the account");
      } else {
        console.error("Failed to merge cart");
      }
    } catch (error) {
      console.error("Error merging cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    if (user) {
      mergeLocalCartToApiCart();
    }
  }, [user]);

  // Add product to cart (for both logged-in and guest users)
  const addToCart = async (
    productId,
    name,
    imageCover,
    price,
    quantity = 1
  ) => {
    setLoadingCart(true);
    if (user) {
      // For logged-in users, send a PATCH request to update the cart on the server
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/cart/products`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser((prevUser) => ({
            ...prevUser,
            cart: data,
          }));

          toast.success("Item added to cart");
        } else {
          toast.error("Failed to add item to cart");
        }
      } catch (error) {
        console.error("Error updating cart on server:", error);
      } finally {
        setLoadingCart(false);
      }
    } else {
      // For guest users, update the local cart
      setCart((prevCart) => {
        const safePrevCart = Array.isArray(prevCart) ? prevCart : [];
        const existingProduct = safePrevCart.find(
          (item) => item.productId === productId
        );

        let updatedCart;
        if (existingProduct) {
          updatedCart = safePrevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedCart = [
            ...safePrevCart,
            { productId, price, quantity, imageCover, name },
          ];
        }
        saveLocalCart(updatedCart);
        toast.success("Item added to cart");
        return updatedCart;
      });
      setLoadingCart(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cart/products`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            del: true, // Use 'del' instead of 'delete'
            productId,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedCart = await response.json();
        toast.success("Product removed from cart successfully!");
        setUser((prevUser) => ({
          ...prevUser,
          cart: updatedCart,
        }));
      } else {
        const errorData = await response.json();
        toast.error("Removing product from cart failed");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Removing product from cart failed");
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cart/products`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            update: true,
            productId,
            quantity,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedCart = await response.json();
        toast.success("Cart quantity updated successfully!");
        setUser((prevUser) => ({
          ...prevUser,
          cart: updatedCart,
        }));
      } else {
        const errorData = await response.json();
        toast.error("Updaing cart failed");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Updaing cart failed");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cart/products`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedCart = await response.json();
        toast.success("Cart cleared sucessfully");
        setUser((prevUser) => ({
          ...prevUser,
          cart: updatedCart,
        }));
      } else {
        const errorData = await response.json();
        toast.error("Clearing cart failed");
      }
    } catch (error) {
      console.error('Clearing cart failed"', error);
      toast.error("Clearing cart failed");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadingCart,
        totalPrice,
        totalNumberOfItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        mergeLocalCartToApiCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access CartContext
export const useCart = () => {
  return useContext(CartContext);
};
