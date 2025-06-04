import { useState } from "react";
import Link from "next/link";
import {
  filterHandler,
  isVideo,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import Modal from "@/components/Common/Modal";
import PlayIcon from "@/public/images/play.svg";
import BlueLineImage from "@/public/images/whytalquesec1blueline.svg";
import Image from "next/image";

const Section1 = ({ data, logos, loadingSc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div
        className={`tradeshow_get_the_most_out_bg 2xl:px-60 xl:px-14 lg:px-6 px-5 py-10 bg-white ${
          loadingSc && "h-screen"
        }`}>
        <div className="lg:flex items-center w-full xl:gap-10 gap-2">
          <div className="lg:w-[45%] w-full">
            <div className="relative">
              <div
                className={`md:mb-10 mb-3 ${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"} capitalize`}>
                {data?.tradeshow_title}
              </div>
              {data?.tradeshow_title && (
                <div className="z-20 absolute xl:right-[12%] 2xl:top-[44%] xl:top-[30%] lg:right-[12%] lg:top-[29%] md:top-[55%] md:right-[10%] right-[13%] top-[44%]">
                  <Image
                    className="md:w-[390px] w-[170px] md:h-[14px] h-2"
                    src={BlueLineImage}
                    alt="Interaction Blue Line"
                    height={1000}
                    width={1000}
                  />
                </div>
              )}
            </div>
            <div
              className={`md:mb-14 mb-7 text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
              {data?.tradeshow_description}
            </div>

            {data?.get_the_most_out_buttons?.length > 0 && (
              <div className="flex items-center lg:mb-20 mb-6 gap-4">
                {filterHandler(data?.get_the_most_out_buttons)?.map(
                  (item, index) => (
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
                  )
                )}
              </div>
            )}

            {logos?.length > 0 && (
              <div className="lg:flex hidden items-center gap-12 lg:overflow-hidden overflow-auto no-scrollbar px-1">
                {filterHandler(logos)?.map((item, index) => (
                  <div key={index}>
                    {item?.attributes?.logo?.data?.attributes?.url ? (
                      <LazyLoadImage
                        className="min-w-[150px] min-h-[40px] w-[150px] h-[40px] mr-[40px]"
                        src={item?.attributes?.logo?.data?.attributes?.url}
                        altText="Tradeshow Logo"
                      />
                    ) : (
                      renderLogo(
                        "min-w-[150px] min-h-[40px] w-[150px] h-[40px] mr-[40px]"
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={`relative lg:w-[55%] w-full ${
              isVideo(data) && "cursor-pointer"
            }`}
            onClick={() => isVideo(data) && setIsModalOpen(!isModalOpen)}>
            <LazyLoadImage
              src={
                isVideo(data)
                  ? data?.teaser_video_thumbnail?.data?.attributes?.url
                  : data?.teaser_image?.data?.attributes?.url
              }
              className="max-w-[80%]"
              altText="Tradeshows Teaser Image"
            />

            {isVideo(data) && (
              <Image
                className="lg:w-[85px] w-[59px] z-40 absolute right-[55%] top-[41%]"
                src={PlayIcon}
                alt="Tradeshows Teaser Image"
                height={1000}
                width={1000}
              />
            )}
          </div>

          {logos?.length > 0 && (
            <div className="lg:hidden flex items-center gap-12 overflow-auto px-1 mt-10 no-scrollbar">
              {filterHandler(logos)?.map((item, index) => (
                <div key={index}>
                  {item?.attributes?.logo?.data?.attributes?.url ? (
                    <LazyLoadImage
                      className="min-w-[150px] min-h-[40px] w-[150px] h-[40px] mr-[40px]"
                      src={item?.attributes?.logo?.data?.attributes?.url}
                      altText={"Tradeshow Logo"}
                    />
                  ) : (
                    renderLogo(
                      "min-w-[150px] min-h-[40px] w-[150px] h-[40px] mr-[40px]"
                    )
                  )}
                </div>
              ))}
            </div>
          )}
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
