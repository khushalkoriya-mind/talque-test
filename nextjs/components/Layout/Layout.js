import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { removeLocalStorageItem } from "@/utils/helper";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    window.scroll({
      top: position.top,
      left: position.left,
      behavior: "smooth",
    });
  });
  const scrollTop = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollTop.current.style.display = "flex";
      } else {
        scrollTop.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    removeLocalStorageItem("language");
  }, []);

  const backToTopBtn = () => {
    return (
      <span
        title="Back to Top"
        onClick={() =>
          setPosition({ ...position, position: { top: 0, left: 0 } })
        }
        style={{
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
        }}
        className="z-40 shadow-inherit rounded-full w-[60px] h-[60px] right-[2%] bottom-[3%] fixed hidden text-center p-4 bg-gradient-to-r from-[#D17FE7] to-[#798DDE] text-white items-center justify-center hover:shadow-xl cursor-pointer"
        ref={scrollTop}>
        <ArrowUpIcon className="font-bold" />
      </span>
    );
  };

  return (
    <>
      {router?.pathname !== "/404" && (
        <>
          <Header />

          <Toaster position="top-center" />
        </>
      )}
      {children}
      {router?.pathname !== "/404" && (
        <>
          <Footer />
          {backToTopBtn()}
        </>
      )}
    </>
  );
};

export default Layout;
