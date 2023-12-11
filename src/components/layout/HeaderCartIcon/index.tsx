"use client";

import { cartAtom } from "@/components/common/Cart/atom";
import { useAtom } from "jotai";
import { ShoppingCart } from "lucide-react";

export const HeaderCartIcon = () => {
  const [cartState] = useAtom(cartAtom);
  return (
    <div className="relative">
      {cartState.length > 0 && (
        <span className="bg-brand-600 rounded-full w-6 h-6 font-semibold text-sm grid place-items-center absolute -top-3 -right-2">
          {cartState.length}
        </span>
      )}
      <ShoppingCart />
    </div>
  );
};
