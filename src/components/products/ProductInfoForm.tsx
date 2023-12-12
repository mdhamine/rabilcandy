import { IProduct } from "@/data/products";
import { cartAtom } from "../common/Cart/atom";
import { useAtom } from "jotai";
import { popupAtom } from "../common/Popup/atom";
import { FormEvent } from "react";

export const ProductInfoForm = ({ product }: { product: IProduct }) => {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [, setPopupState] = useAtom(popupAtom);

  const isAlreadyInCart = cartState.find((item) => item.slug === product.slug);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const size = document.forms["product-info" as any]["size"].value;
    const color = document.forms["product-info" as any]["color"].value;

    if (isAlreadyInCart) {
      // we modify the cart if current item is already in cart
      // update the size and color to latest selected values
      setCartState((prev) => {
        return prev.map((item) => {
          if (item.slug === product.slug) {
            return {
              ...item,
              size,
              color,
            };
          }

          return item;
        });
      });
      alert(`Item updated in cart`);
    } else {
      setCartState((prev) => {
        if (!prev) return [];
        return [
          ...prev,
          {
            slug: product.slug!,
            size,
            color,
          },
        ];
      });

      alert(`Item successfully added to cart`);
    }

    setPopupState({
      open: false,
    });
  };

  return (
    <div className="bg-white w-11/12 p-4 rounded-xl">
      <p className="font-semibold text-xl">Select options</p>
      <form className="my-2" onSubmit={handleSubmit} name="product-info">
        <div>
          <label htmlFor="size" className="mr-4">
            Size
          </label>
          <select className="bg-gray-200 rounded-lg p-1" name="size" id="size">
            {product?.sizes?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="color" className="mr-4">
            Color
          </label>
          <select
            className="bg-gray-200 rounded-lg p-1"
            name="color"
            id="color"
          >
            {product?.color?.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-brand-400 mt-4 font-semibold px-3 py-1.5 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
          {isAlreadyInCart ? "Update Cart" : "Add to Cart"}
        </button>
      </form>
    </div>
  );
};
