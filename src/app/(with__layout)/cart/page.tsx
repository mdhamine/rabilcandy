"use client";

import { cartAtom } from "@/components/common/Cart/atom";
import { CheckoutForm } from "@/components/common/Checkout";
import { popupAtom } from "@/components/common/Popup/atom";
import { IProduct } from "@/data/products";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [popupState, setPopupState] = useAtom(popupAtom);

  const [products, setProducts] = useState([] as IProduct[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!cartState.length) return;
    (async () => {
      // console.log(cartState, "cartState");
      setIsLoading(true);
      const res = await fetch(
        `/api/product?slugs=${cartState.map((item) => item.slug).join(",")}`
      );
      const json = await res.json();

      setProducts(json?.data || []);
      setIsLoading(false);

      // console.log(json, "json");
    })();
  }, [cartState]);

  const handleItemRemove = (id?: string) => {
    setCartState((prev) => {
      return prev.filter((item) => item.slug !== id);
    });
  };

  const handleCheckout = () => {
    setPopupState({
      open: true,
      component: <CheckoutForm />,
    });
  };

  // console.log(products, "prod");

  return (
    <div className="min-h-screen">
      <div>
        <p className="font-extrabold text-3xl">Your Cart</p>
      </div>
      <div className="mt-8">
        {isLoading && <p>Loading...</p>}
        {products?.map((product) => {
          // if (!item) return null;
          const item = cartState.find((item) => item.slug === product?.slug);
          return (
            <div key={item?.slug} className="">
              <div className="relative">
                {/* eslint-disable-next-line */}
                <img src={product?.thumbnail} alt={product?.name} />
                <button
                  onClick={() => handleItemRemove(item?.slug)}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-4 bg-brand-400 font-semibold px-3 py-1 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
                >
                  Remove from cart
                </button>
              </div>
              <p className="text-brand-500 text-lg font-semibold mt-2">
                {product?.name}
              </p>
              <p>Color: {item?.color}</p>
              <p>Size: {item?.size}</p>
              <p>
                Price: {product?.price} {product?.currency}
              </p>
            </div>
          );
        })}
      </div>
      {cartState.length === 0 && !isLoading && (
        <>
          <div className="mb-4">Your cart is empty.</div>
          <Link href="/products">
            <button className="btn-primary">Click here to shop</button>
          </Link>
        </>
      )}
      {!isLoading && (
        <>
          <div className="h-0.5 bg-brand-300 my-4" />
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>
              {products.reduce((acc, item) => {
                if (!item.price) return acc;
                return acc + item?.price;
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
