"use client";

import { cartAtom } from "@/components/common/Cart/atom";
import { popupAtom } from "@/components/common/Popup/atom";
import { ProductInfoForm } from "@/components/products/ProductInfoForm";
import { getProductById } from "@/data/products";
import { useAtom } from "jotai";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProductsDetail({
  params,
}: {
  params: { productId: string };
}) {
  const product = getProductById(params.productId);

  const [, setPopupState] = useAtom(popupAtom);
  const [cartState] = useAtom(cartAtom);

  if (!product) {
    return redirect("/products");
  }

  const isAlreadyInCart = cartState.find((item) => item.id === product.id);

  const handlePopupOpen = () => {
    setPopupState({
      open: true,
      component: <ProductInfoForm product={product} />,
    });
  };

  return (
    <>
      <Link href="/products">
        <span className="inline-flex items-center text-sm py-1 px-1.5 space-x-1 font-semibold rounded-lg bg-brand-300/50">
          <span>
            <ChevronLeft size={20} />
          </span>
          <span>Back</span>
        </span>
      </Link>
      {/* eslint-disable-next-line  */}
      <img className="mt-4" src={product?.thumbnail} alt={product.name} />
      <div className="mb-4 mt-2">
        <p className="text-brand-500 text-xl font-semibold">{product.name}</p>
        <p className="mt-1">{product?.description}</p>
      </div>

      <p>
        {product.price} {product.currency}
      </p>
      {product.sizes.length > 0 && <p>Sizes: {product.sizes.join(", ")}</p>}
      {product.color.length > 0 && (
        <p>
          Colors: <span className="capitalize">{product.color.join(", ")}</span>
        </p>
      )}
      {product.outOfStock && (
        <div className="text-center bg-brand-400/30 rounded-lg py-1 mt-2">
          Out of stock
        </div>
      )}
      <div className="mt-4 grid place-items-center">
        <button
          disabled={product.outOfStock}
          className="disabled:opacity-50 disabled:pointer-events-none btn-primary"
          onClick={handlePopupOpen}
        >
          {isAlreadyInCart ? "Update cart" : "Add to cart"}
        </button>
      </div>
    </>
  );
}
