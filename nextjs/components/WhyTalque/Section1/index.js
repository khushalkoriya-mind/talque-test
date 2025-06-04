import React, { useState } from "react";
import Link from "next/link";
import BlueLineImage from "@/public/images/whytalquesec1blueline.svg";
import { filterHandler, isVideo, classes, LazyLoadImage } from "@/utils/helper";
import Modal from "@/components/Common/Modal";
import PlayIcon from "@/public/images/play.svg";
import Image from "next/image";

const Section1 = ({ data, loadingSc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div
        className={`why_talque_sec1_bg 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:pt-16 pt-10 pb-16 bg-white ${
          loadingSc && "h-screen"
        }`}>
        <div className="lg:flex items-center w-full gap-x-32">
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div
                className={`lg:mb-10 mb-4 ${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"}`}>
                {data?.title}
              </div>
              {data?.title && (
                <div className="z-20 absolute xl:right-[55%] 2xl:top-[33%] xl:top-[31%] lg:right-[32%] lg:top-[23%] md:top-[48%] md:right-[14%] right-[48%] top-[28%]">
                  <Image
                    className="md:w-[350px] w-[170px] md:h-[14px] h-2"
                    src={BlueLineImage}
                    alt="Why Talque Blue Line"
                    height={1000}
                    width={1000}
                  />
                </div>
              )}
            </div>
            <div
              className={`lg:mb-14 mb-8 text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
              {data?.description}
            </div>
            {data?.cta_boxes?.length > 0 && (
              <div className="flex items-center lg:mb-20 mb-6 gap-4 no-scrollbar overflow-x-auto">
                {filterHandler(data?.cta_boxes)?.map((item, index) => (
                  <Link
                    target={item?.target || "_blank"}
                    href={item?.url ?? "/"}
                    key={index}
                    className={`whitespace-nowrap px-5 py-3.5 shadow-sm xl:text-base text-sm font-normal rounded-full border 
                ${
                  item?.type === "Transparent"
                    ? "hover:border-transparent bg-transparent hover:bg-[#227BEF] hover:text-white"
                    : "border-transparent bg-dark-blue hover:bg-blue-600 text-white"
                }
                `}>
                    {item?.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div
            className={`relative lg:w-1/2 w-full ${
              isVideo(data) && "cursor-pointer"
            }`}
            onClick={() => isVideo(data) && setIsModalOpen(!isModalOpen)}>
            <LazyLoadImage
              src={
                isVideo(data)
                  ? data?.teaser_video_thumbnail?.data?.attributes?.url
                  : data?.teaser_image?.data?.attributes?.url
              }
              altText={`Why Talque Teaser Image`}
            />
            {isVideo(data) && (
              <Image
                className="lg:w-[110px] w-[59px] z-40 absolute right-[41%] top-[41%]"
                src={PlayIcon}
                alt={`Why Talque Teaser Image`}
                height={1000}
                width={1000}
              />
            )}
          </div>
        </div>
      </div>
      {isModalOpen && isVideo(data) && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          url={data?.teaser_video?.data?.attributes?.url}
        />
      )}
    </section>
  );
};

export default Section1;
