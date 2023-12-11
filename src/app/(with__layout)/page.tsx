"use client";

import { Tiktok } from "@/components/icons/Tiktok";
import { Facebook, Instagram, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div data-aos="fade-up">
        <div className="mt-8">
          <h1 className="text-center text-balance text-4xl font-extrabold">
            Shop your favorites
          </h1>
        </div>
        <div className="grid place-items-center mt-4 space-y-2">
          <Link href="/products">
            <button className="bg-brand-400 font-semibold px-6 py-2 rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
              Click here to Shop
            </button>
          </Link>
          <Link href="/cart">
            <button className="border-[3px] border-brand-400 font-semibold px-6 py-1.5 rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
              Go to cart
            </button>
          </Link>
        </div>
        <div className="masked-hero-image max-w-md w-3/4 mx-auto mt-8">
          <Image
            src="/images/home/1.png"
            alt="Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="mt-8 grid place-items-center">
        <p className="font-extrabold text-2xl text-center" data-aos="fade-up">
          Featured Products
        </p>
        <div className="mt-8 space-y-6">
          <Image
            src="/images/home/featured/1.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-t-full"
            data-aos="fade-up"
          />
          <Image
            src="/images/home/featured/2.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            data-aos="fade-up"
          />
          <Image
            src="/images/home/featured/3.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            data-aos="fade-up"
          />
        </div>
      </div>
    </>
  );
}
