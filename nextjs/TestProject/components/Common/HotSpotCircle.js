import React, { useEffect, useRef, useState } from "react";
import CircleArrow from "@/public/images/whytalquearrow.svg";
import PlusIcon from "@/public/images/whytalqueplusicon.svg";
import CrossIcon from "@/public/images/crossicon.svg";
import WhyTalqueCircleImage from "@/public/images/whytalque-circle.svg";
import { LazyLoadImage, MarkdownRenderer, classes } from "@/utils/helper";
import Image from "next/image";

const HotSpotCircle = ({ hotSpot, className }) => {
  const plusIconRef = useRef(null);
  const [selectedIconId, setSelectedIconId] = useState(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (plusIconRef.current && !plusIconRef.current.contains(event.target)) {
      setSelectedIconId(null);
    }
  };

  const renderBox = (attributes, id, flag) => {
    return selectedIconId === id ? (
      <div
        className={`${
          !flag ? "mr-3" : "ml-3"
        } bg-white shadow-xl flex flex-col items-start py-4 px-5 rounded-xl min-w-[300px] max-w-[300px] max-h-[340px] capitalize z-10`}>
        <div
          className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} mb-4`}>
          {attributes?.title}
        </div>
        {attributes?.description && (
          <div
            className={`${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} text-talque-secondary-color whitespace-normal`}>
            <MarkdownRenderer content={attributes?.description} />
          </div>
        )}
      </div>
    ) : (
      <div
        className={`${
          !flag ? "mr-3" : "ml-3"
        } ${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} capitalize`}>
        {attributes?.title}
      </div>
    );
  };

  const renderPlusItem = (data, className, flag) => {
    const { attributes, id } = data;
    return (
      <div
        onClick={() => {
          setSelectedIconId(selectedIconId === id ? 0 : id);
        }}
        className={`absolute ${className}`}>
        <div
          style={{ justifyContent: flag ? "flex-start" : "flex-end" }}
          className="flex w-[200px]">
          {!flag ? renderBox(attributes, id) : ""}
          <Image
            className={`w-[34px] h-[34px] cursor-pointer object-cover`}
            src={selectedIconId === id ? CrossIcon : PlusIcon}
            alt="Plus Icon Left"
            height={1000}
            width={1000}
          />
          {flag ? renderBox(attributes, id, flag) : ""}
        </div>
      </div>
    );
  };

  const renderArrowImage = (className) => {
    return (
      <Image
        className={`w-[34px] absolute ${className} object-cover`}
        src={CircleArrow}
        alt="Circle Arrow Left"
        height={1000}
        width={1000}
      />
    );
  };

  return (
    <div
      className={`flex place-content-center px-10 pt-14 ${className} md:overflow-visible overflow-hidden`}>
      <div
        ref={plusIconRef}
        className="lg:w-[450px] w-[300px] lg:h-[450px] h-[300px] rounded-full shadow-2xl grid place-content-center bg-white relative">
        <div className="lg:w-[400px] w-[250px] lg:h-[400px] h-[250px] rounded-full grid place-content-center border border-black">
          <div className="lg:w-[300px] w-[150px] lg:h-[300px] h-[150px] rounded-full border border-dashed border-gray-400 grid place-content-center">
            <Image
              className="min-w-[160px] min-h-[160px] w-[160px] h-[160px] object-cover grid place-content-center focused-image opacity-50"
              src={WhyTalqueCircleImage}
              alt="Why Talque"
              height={1000}
              width={1000}
            />
            {/* ARROW ICONS LIST START (Left, Bottom, Top, Right ) */}
            {renderArrowImage("top-[48%] left-[2%]")}
            {renderArrowImage(
              "lg:top-[90%] top-[86%] left-[48%] rotate-[268deg]"
            )}
            {renderArrowImage("lg:top-[2%] top-[3%] left-[46%] rotate-[92deg]")}
            {renderArrowImage(
              "absolute top-[46%] lg:left-[90%] left-[86%] rotate-180"
            )}

            {/* PLUS ICON LIST START (Left, Bottom, Top, Right ) */}
            {hotSpot[0] &&
              renderPlusItem(
                hotSpot[0],
                "top-[78%] lg:-left-[22%] -left-[34%]",
                null
              )}
            {hotSpot[2] &&
              renderPlusItem(
                hotSpot[2],
                "top-[17%] lg:-left-[24%] -left-[42%]",
                null
              )}
            {hotSpot[1] &&
              renderPlusItem(
                hotSpot[1],
                "top-[19%] lg:left-[82%] left-[77%]",
                1
              )}
            {hotSpot[3] &&
              renderPlusItem(
                hotSpot[3],
                "top-[76%] lg:left-[79%] left-[71%]",
                1
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSpotCircle;
