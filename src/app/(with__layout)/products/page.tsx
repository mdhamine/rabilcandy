"use client";

import { popupAtom } from "@/components/common/Popup/atom";
import { ProductInfoForm } from "@/components/products/ProductInfoForm";
import { Product, products } from "@/data/products";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [, setPopupState] = useAtom(popupAtom);
  const handlePopupOpen = (product: Product) => {
    setPopupState({
      open: true,
      component: <ProductInfoForm product={product} />,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const isOutOfStock = !!product.outOfStock;
          const isNew = !!product.new;
          const url = `/products/${product.id}`;

          return (
            <div
              data-aos="fade-up"
              className="bg-brand-100 relative rounded-xl opverflow-hidden"
              key={product.id}
            >
              <Link href={url}>
                {isNew && (
                  <div className="absolute top-2 left-2 bg-pink-500/80 text-white px-2 py-1 rounded-xl text-sm">
                    New
                  </div>
                )}
                {isOutOfStock && (
                  <div className="absolute bg-pink-100/60 inset-0 grid place-items-center text-brand-500 font-semibold">
                    Out of stock
                  </div>
                )}
                {/* eslint-disable-next-line  */}
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="rounded-xl"
                  height={500}
                  width={500}
                />
                <div className="p-1.5">
                  <div className="line-clamp-2 font-semibold">
                    {product.name}
                  </div>
                  <div className="text-sm mt-2">
                    Size: {product.sizes.map((size) => size).join(", ")}
                  </div>
                  <div className="text- mt-4">
                    Price: {product.price} {product.currency}
                  </div>
                </div>
              </Link>
              {!isOutOfStock && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopupOpen(product);
                  }}
                  className="absolute bg-pink-100 rounded-full right-2 top-2"
                >
                  <Plus size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
