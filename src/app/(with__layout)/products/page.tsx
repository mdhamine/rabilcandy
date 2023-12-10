import { products } from "@/data/products";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => {
          const isOutOfStock = !!product.outOfStock;
          const isNew = !!product.new;

          return (
            <div
              data-aos="fade-up"
              key={product.id}
              className="bg-brand-100 relative rounded-xl opverflow-hidden"
            >
              {isNew && (
                <div className="absolute top-2 left-2 bg-pink-500/80 text-white px-2 py-1 rounded-xl text-sm">
                  New
                </div>
              )}
              {!isOutOfStock && (
                <div className="absolute bg-pink-100 rounded-full right-2 top-2">
                  <Plus size={20} />
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
                <div className="line-clamp-2 font-semibold">{product.name}</div>
                <div className="text-sm mt-2">
                  Size: {product.sizes.map((size) => size).join(", ")}
                </div>
                <div className="text- mt-4">
                  Price: {product.price} {product.currency}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
