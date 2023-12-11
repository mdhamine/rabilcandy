"use client";

import { cartAtom } from "@/components/common/Cart/atom";
import { CheckoutForm } from "@/components/common/Checkout";
import { popupAtom } from "@/components/common/Popup/atom";
import { getProductById } from "@/data/products";
import { useAtom } from "jotai";
import Link from "next/link";

export default function Cart() {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [popupState, setPopupState] = useAtom(popupAtom);

  const handleItemRemove = (id: string) => {
    setCartState((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const handleCheckout = () => {
    setPopupState({
      open: true,
      component: <CheckoutForm />,
    });
  };

  return (
    <div className="h-screen">
      <div>
        <p className="font-extrabold text-3xl">Your Cart</p>
      </div>
      <div className="mt-8">
        {cartState.map((item) => {
          const product = getProductById(item.id);
          if (!product) return null;
          return (
            <div key={item.id} className="">
              <div className="relative">
                {/* eslint-disable-next-line */}
                <img src={product.thumbnail} alt={product.name} />
                <button
                  onClick={() => handleItemRemove(item.id)}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-4 bg-brand-400 font-semibold px-3 py-1 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
                >
                  Remove from cart
                </button>
              </div>
              <p className="text-brand-500 text-lg font-semibold mt-2">
                {product?.name}
              </p>
              <p>Color: {item.color}</p>
              <p>Size: {item.size}</p>
              <p>
                Price: {product.price} {product.currency}
              </p>
            </div>
          );
        })}
      </div>
      {cartState.length === 0 ? (
        <>
          <div className="mb-4">Your cart is empty.</div>
          <Link href="/products">
            <button className="btn-primary">Click here to shop</button>
          </Link>
        </>
      ) : (
        <>
          <div className="h-0.5 bg-brand-300 my-4" />
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>
              {cartState.reduce((acc, item) => {
                const product = getProductById(item.id);
                if (!product) return acc;
                return acc + product.price;
              }, 0)}
            </span>
          </div>
          <div className="mt-4">
            <button className="btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
