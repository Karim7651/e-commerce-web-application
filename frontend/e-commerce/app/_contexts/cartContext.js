"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext"; // Assuming your userContext is in the same directory
import { toast } from "sonner";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading, setUser } = useUser();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

  const getLocalCart = () => {
    if (typeof window !== "undefined") {
      const localCart = localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    }
    return [];
  };

  useEffect(() => {
  const syncCart = () => {
    if (loading) return; // Wait for user data to load

    setLoadingCart(true);
    if (user) {
      // When logged in, use the user's cart
      setCart(user.cart?.products || []);
    } else {
      // When logged out, reset the cart and totals
      const localCart = getLocalCart();
      if (localCart.length > 0) {
        setCart(localCart);
      } else {
        setCart([]);
        setTotalNumberOfItems(0);
        setTotalPrice(0);
      }
    }
    setLoadingCart(false);
  };

  syncCart();
}, [user, loading]);


  useEffect(() => {
    const calculateTotals = () => {
      const totalPrice = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0), // Use fallback values
        0
      );
      const totalItems = cart.reduce(
        (count, item) => count + (item.quantity || 0),
        0
      ); // Use fallback value
      setTotalPrice(totalPrice);
      setTotalNumberOfItems(totalItems);
    };

    if (cart?.length > 0) {
      calculateTotals();
    }
  }, [cart]);

  const saveLocalCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  useEffect(() => {
    if (user) {
      mergeLocalCartToApiCart();
    }
  }, [user]);

  const mergeLocalCartToApiCart = async () => {
    console.log("HERE");
    if (!user || loading) return;

    const localCart = getLocalCart();
    if (localCart.length === 0) return;

    // Map user cart products to the desired format
    const userProducts = user.cart.products.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    // Combine userProducts and localCart
    const combinedProductsMap = new Map();

    // Add user products to the map
    userProducts.forEach((product) => {
      combinedProductsMap.set(product.productId, product);
    });

    // Add local cart products to the map, updating quantity if the product already exists
    localCart.forEach((item) => {
      if (combinedProductsMap.has(item.productId)) {
        const existingProduct = combinedProductsMap.get(item.productId);
        combinedProductsMap.set(item.productId, {
          productId: item.productId,
          quantity: existingProduct.quantity + item.quantity, // Sum quantities
        });
      } else {
        combinedProductsMap.set(item.productId, {
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    });

    const products = Array.from(combinedProductsMap.values()); // Use .values() to get the product objects
    console.log(`Products before POST request:`, products); // Log products array

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API}/cart/products`;
      console.log(endpoint);
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          override: true,
          products,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCart(data.updatedCart);
        setUser((prevUser) => ({
          ...prevUser,
          cart: data
        }));
        setCart(data);
        localStorage.removeItem("cart");
        toast.success("Local cart successfully merged with the account")
      } else {
        console.error("Failed to merge cart");
      }
    } catch (error) {
      console.error("Error merging cart:", error);
    }
  };

  const addToCart = async (productId, price, quantity = 1) => {
    if (user) {
      // If a user is logged in, send a PATCH request to update the cart on the server
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart/products`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity,
          }),
          credentials: "include",
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setCart(data.updatedCart); 
          setUser((prevUser) => ({
            ...prevUser,
            cart: data,
          }));
          console.log("HEREEE")
          toast.success("Item added to cart")
        } else {
          toast.error("Failed to add item to cart")
          console.error("Failed to update cart on server");
        }
      } catch (error) {
        console.error("Error updating cart on server:", error);
      }
    } else {
      // If no user is logged in, update the local cart
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
          updatedCart = [...safePrevCart, { productId, price, quantity }];
        }
        console.log("HEREEE 2")
        toast.success("Item added to cart")
        saveLocalCart(updatedCart);
        return updatedCart;
      });
    }
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      if (!user) saveLocalCart(updatedCart);
      return updatedCart;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      if (!user) saveLocalCart(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadingCart,
        totalPrice,
        totalNumberOfItems,
        addToCart,
        setCart,
        removeFromCart,
        updateCartQuantity,
        mergeLocalCartToApiCart,
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
