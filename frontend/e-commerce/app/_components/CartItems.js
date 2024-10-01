"use client";
import { useCart } from "../_contexts/cartContext";
import { useUser } from "../_contexts/userContext";
import CartItem from "./CartItem";

export default function CartItems() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    totalPrice,
    totalNumberOfItems,
  } = useCart();
  const { user } = useUser();
  if (!user) {
    return (
      <>
        <div className="h-svh  flex items-center justify-center mx-auto blur-lg">
          <h2 className="text-3xl font-bold text-base-content z-10 select-none">
            Login to view your cart
          </h2>
        </div>
      </>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="h-svh  flex items-center justify-center mx-auto">
        <h2 className="text-3xl font-bold text-base-content">
          Your cart is empty.
        </h2>
      </div>
    );
  }

  return (
    <section className="w-[80%] min-h-svh mx-auto !my-auto ">
      <h2 className="sr-only">Shopping Cart Items</h2>
      {cart.map((product, index) => {
        console.log(product.id);

        return (
          <CartItem
            key={product.product.id}
            product={product}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            hasBorder={index !== cart.length - 1}
          />
        );
      })}

      <div className="flex justify-between items-center py-4 mt-4 border-t-[0.15rem] border-neutral-600">
        <p className="text-lg">
          Subtotal ({totalNumberOfItems} item{totalNumberOfItems > 1 && "s"}):
        </p>
        <div className="flex flex-row justify-start items-center">
          {/* Currency first */}
          <span className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]">
            EGP
          </span>
          {/* Total Price with toLocaleString */}
          <span className="text-lg font-semibold">
            {totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
