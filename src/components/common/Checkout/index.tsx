import { useAtom } from "jotai";
import { FormEvent } from "react";
import { cartAtom } from "../Cart/atom";
import { popupAtom } from "../Popup/atom";
import { SelectOptions } from "@/data/select";

export const CheckoutForm = () => {
  const [, setCartState] = useAtom(cartAtom);
  const [, setPopupState] = useAtom(popupAtom);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const size = document.forms["product-info" as any]["size"]?.value;
    const color = document.forms["product-info" as any]["color"]?.value;

    alert(`We will contact you shortly via your email`);

    setPopupState({
      open: false,
    });
    setCartState([]);
  };

  return (
    <div className="bg-white w-11/12 p-4 rounded-xl">
      <p className="font-semibold text-xl">Enter Details</p>
      <form
        className="my-2 space-y-2"
        onSubmit={handleSubmit}
        name="product-info"
      >
        <div>
          <label htmlFor="fullname">Your fullname</label>
          <input
            type="text"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Fullname"
            name="fullname"
            id="fullname"
          />
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="phone">Your Phone</label>
          <input
            type="text"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Phone"
            name="phone"
            id="phone"
          />
        </div>
        <div>
          <label htmlFor="address">Your Address</label>
          <input
            type="text"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Address"
            name="address"
            id="address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="select">Select</label>
          <select
            name="select"
            id="select"
            className="h-10 border-2 border-brand-300 rounded-lg px-3"
          >
            {SelectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-4">
          <button className="bg-brand-400 w-full font-semibold px-3 py-3 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};
