"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CartItem = ({
  product,
  updateCartQuantity,
  removeFromCart,
  hasBorder,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isCustom, setIsCustom] = useState(false);

  const handleQuantityChange = (value) => {
    setQuantity(value);
    updateCartQuantity(product.product.id, value);
    setIsCustom(false);
  };

  const handleCustomChange = (e) => {
    const value = parseInt(e.target.value);

    if (value < 1) {
      toast.error("Quantity too small, min value: 1");
      return;
    }

    if (value > 100) {
      toast.error("Quantity too big, max value: 100");
      return;
    }

    if (/^\d*$/.test(e.target.value)) {
      setQuantity(e.target.value);
    }
  };

  const handleCustomSubmit = () => {
    const parsedQuantity = parseInt(quantity);

    if (parsedQuantity && parsedQuantity >= 1 && parsedQuantity <= 100) {
      handleQuantityChange(parsedQuantity);
    } else {
      setQuantity(1); // Reset to 1 if the input is invalid
    }
  };

  return (
    <article
      className={`flex justify-between items-center py-6 ${
        hasBorder ? "border-b border-neutral-600" : ""
      }`}
      aria-labelledby={`cart-item-${product.productId}`}
    >
      <div className="flex items-center space-x-8">
        <div className="relative lg:h-40 lg:w-40 xs:h-28 xs:w-28 flex items-center justify-center shrink-0">
          <Image
            src={product.product.imageCover}
            alt={`image of ${product.product.name}`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex flex-col gap-2 items-start justify-center">
          <h2
            id={`cart-item-${product.product._id}`}
            className="text-lg font-semibold"
          >
            {product.product.name}
          </h2>
          <button
            className="btn btn-error btn-md text-base-content w-25 flex items-center justify-center"
            onClick={() => removeFromCart(product.product.id)}
            aria-label={`Remove ${product.product.name} from cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
              <path d="M12 10l4 4m0 -4l-4 4" />
            </svg>
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center">
        <div className="flex flex-row justify-start items-center mb-2">
          <span className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]">
            EGP
          </span>
          <span className="font-semibold text-base-content">
            {(product?.product?.finalPrice * quantity)?.toLocaleString() || "0"}
          </span>
        </div>

        {quantity > 1 && (
          <div className="flex flex-row justify-start items-center mb-2">
            <span className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]">
              EGP
            </span>
            <span className="text-sm text-gray-500">
              {quantity} x {product.product.finalPrice.toLocaleString()}
            </span>
          </div>
        )}

        <label
          htmlFor={`quantity of ${product.product.name}`}
          className="sr-only"
        >
          Quantity
        </label>
        <select
          id={`quantity-${product.product.id}`}
          value={isCustom ? "" : quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value) {
              handleQuantityChange(value);
            } else {
              setIsCustom(true);
            }
          }}
          className="border border-neutral-300 rounded p-1 mb-2 bg-base-200"
          aria-label={`Change quantity for ${product.product.name}`}
        >
          {/* Render options 1-10 */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}

          {/* If the product's quantity exceeds 10, add it as an option */}
          {product.quantity > 10 && (
            <option value={product.quantity}>{product.quantity}</option>
          )}

          {/* Custom option */}
          <option value="">Custom</option>
        </select>

        {isCustom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <input
              type="text"
              value={quantity}
              onChange={handleCustomChange}
              onBlur={handleCustomSubmit} // Submit on blur
              onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()} // Submit on Enter
              placeholder="Enter quantity"
              className="border border-neutral-300 rounded p-1 mb-2 bg-base-200"
              aria-label={`Custom quantity for ${product.product.name}`}
            />
          </motion.div>
        )}
      </div>
    </article>
  );
};

export default CartItem;
