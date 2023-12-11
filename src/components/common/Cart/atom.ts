import { atomWithStorage } from "jotai/utils";

interface Cart {
  id: string;
  size?: string;
  color?: string;
}

export const cartAtom = atomWithStorage("cart", [] as Cart[]);
