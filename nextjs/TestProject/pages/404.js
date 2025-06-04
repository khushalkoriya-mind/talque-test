import React from "react";
import Image from "next/image";
import PageNotFoundImage from "@/public/images/four0four.jpg";
import { useRouter } from "next/router";

const FouroFour = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-y-10">
      <Image
        className="w-[38%]"
        height={1000}
        width={1000}
        alt="Page not found"
        src={PageNotFoundImage}
        priority
      />
      <button
        onClick={() => router?.push("/")}
        className="relative overflow-hidden bg-gradient-to-r from-[#D17FE7] to-[#798DDE] rounded-md px-7 py-3.5 text-lg text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#798DDE] hover:to-[#D17FE7]">
        Back to Home
      </button>
    </div>
  );
};

export default FouroFour;
