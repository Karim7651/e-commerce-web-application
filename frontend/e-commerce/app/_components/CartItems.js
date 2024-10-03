"use client";
import { useCart } from "../_contexts/cartContext";
import { useUser } from "../_contexts/userContext";
import CartItem from "./CartItem";
import Trash from "tabler-icons-react/dist/icons/trash";
import ShoppingCartPlus from "tabler-icons-react/dist/icons/shopping-cart-plus";
import Loading from "./Loading";
export default function CartItems() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    totalPrice,
    totalNumberOfItems,
    clearCart,
    loadingCart,
  } = useCart();
  const { user, loading } = useUser();
  if (loading || loadingCart) {
    console.log(cart);
    return (
      <main className="h-svh flex items-center justify-center mx-auto">
        <Loading />
      </main>
    );
  }
  if (!user || cart[0]?.productId) {
    console.log(cart);
    return (
      <main className="h-svh flex items-center justify-center mx-auto flex-col">
        <h2 className="text-3xl font-bold text-base-content select-none">
          Login to view your cart
        </h2>
        <p className="text-xl font-light text-base-content select-none mt-2">
          Don't worry your cart will be moved to your account
        </p>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="h-svh flex items-center justify-center mx-auto">
        <h2 className="text-3xl font-bold text-base-content">
          Your cart is empty.
        </h2>
      </main>
    );
  }
  console.log(cart);
  console.log(`user loading state ${loading}`);
  console.log(`cart loading state ${loadingCart}`);
  return (
    <main className="w-[80%] min-h-svh mx-auto my-auto">
      {/* Section for cart items */}
      <section aria-labelledby="cart-items-heading">
        <h2 id="cart-items-heading" className="sr-only">
          Shopping Cart Items
        </h2>
        <ul role="list" aria-label="List of items in your shopping cart">
          {cart.map((product, index) => (
            <li key={product.product.id}>
              <CartItem
                product={product}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                hasBorder={index !== cart.length - 1}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Subtotal and checkout section */}
      <section
        aria-labelledby="cart-summary-heading"
        className="py-4 mt-4 border-t-[0.15rem] border-neutral-600"
      >
        <h2 id="cart-summary-heading" className="sr-only">
          Cart Summary
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-lg">
            Subtotal ({totalNumberOfItems} item{totalNumberOfItems > 1 && "s"}):
          </p>
          <div className="flex flex-row justify-start items-center">
            <span
              className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]"
              aria-hidden="true"
            >
              EGP
            </span>
            <span className="text-lg font-semibold">
              {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <section
        aria-label="Cart actions"
        className="flex w-full items-center justify-between mb-10"
      >
        {/* Clear Cart Button */}
        <button
          onClick={clearCart}
          className="w-[30%] flex items-center justify-center px-4 py-2 bg-red-500 shadow-lg text-base-content rounded-sm hover:bg-red-600 hover:scale-105 hover:shadow-xl transition-all duration-300  active:scale-95"
          aria-label="Clear cart"
        >
          <Trash className="mr-2" size={20} />
          Clear Cart
        </button>

        {/* Buy Now Button */}
        <button
          onClick={clearCart}
          className=" w-[30%] flex items-center justify-center px-4 py-2 bg-green-500 shadow-lg text-base-content rounded-sm hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300  active:scale-95"
          aria-label="Proceed to checkout"
        >
          <ShoppingCartPlus className="mr-2" size={20} />
          Buy Now
        </button>
      </section>
    </main>
  );
}
