"use client";
import { useState } from "react";
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
  const [isClearing, setIsClearing] = useState(false); // Track cart clearing state

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  };

  if (loading || loadingCart) {
    return (
      <main className="h-svh flex items-center justify-center mx-auto">
        <Loading />
      </main>
    );
  }

  if (!user || cart[0]?.productId) {
    return (
      <main className="h-svh flex items-center justify-center mx-auto flex-col">
        <h2 className="text-3xl font-bold text-base-content select-none">
          Login | Sign Up to view your cart
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

  return (
    <section className="relative sm:w-[80%] xs:w-[100%] xs:p-2 min-h-svh mx-auto my-auto">
      {/* Blurry overlay and loading spinner when clearing cart */}
      {isClearing && (
        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm z-10 flex items-center justify-center">
          <Loading /> {/* Loading indicator */}
        </div>
      )}

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
        className="py-4 mt-4 border-t-[0.15rem] border-neutral-600 px-2"
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
        className="flex w-full items-center justify-between mb-10 px-2 "
      >
        {/* Clear Cart Button */}
        <button
          onClick={handleClearCart}
          className="font-bold flex items-center lg:w-[30%] justify-center px-4 py-2 bg-red-500 shadow-lg text-base-content rounded-sm hover:bg-red-600 hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95"
          aria-label="Clear cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-off w-6 h-6 mr-2 stroke-base-content "
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17a2 2 0 1 0 2 2" />
            <path d="M17 17h-11v-11" />
            <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
            <path d="M3 3l18 18" />
          </svg>
          Clear Cart
        </button>

        {/* Buy Now Button */}
        <button
          onClick={clearCart}
          className=" font-bold   flex items-center lg:w-[30%] justify-center px-4 py-2 bg-green-500 shadow-lg text-base-content rounded-sm hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95"
          aria-label="Proceed to checkout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-check stroke-base-content w-6 h-6 mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M11.5 17h-5.5v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
            <path d="M15 19l2 2l4 -4" />
          </svg>
          Buy Now
        </button>
      </section>
    </section>
  );
}
