import { useEffect, useState } from "react";
import Link from "next/link";
import { filterHandler, isVideo, classes, LazyLoadImage } from "@/utils/helper";
import PlayIcon from "@/public/images/play.svg";
import Modal from "@/components/Common/Modal";
import BlueLineImage from "@/public/images/whytalquesec1blueline.svg";
import Image from "next/image";

const Section1 = ({ data, loadingSc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [URL, setURL] = useState(true);

  useEffect(() => {
    const src = isVideo(data)
      ? data?.teaser_video_thumbnail?.data?.attributes?.url
      : data?.teaser_image?.data?.attributes?.url;
    setURL(src);
  }, [data]);

  return (
    <section>
      <div
        className={`homepage_make_an_event_bg 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:pt-24 pt-10 pb-0 ${
          loadingSc && "h-screen"
        }`}>
        <div className="lg:flex items-center w-full">
          <div className="lg:w-3/5 w-full lg:mr-10 mr-0">
            <div className="relative">
              <div
                className={`mb-10 ${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"} capitalize`}>
                {data?.homepage_title}
              </div>
              {data?.homepage_title && (
                <div className="z-20 absolute xl:top-20 lg:top-16 md:top-14 xl:right-48 right-28 top-12">
                  <Image
                    className="md:w-[300px] w-[170px] md:h-[10px] h-2 object-cover"
                    src={BlueLineImage}
                    alt="Homepage Blue Line"
                    height={1000}
                    width={1000}
                  />
                </div>
              )}
            </div>
            <div
              className={`lg:mb-14 mb-10 text-talque-primary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
              {data?.homepage_description}
            </div>
            {data?.cta_boxes?.length > 0 && (
              <div className="flex items-center lg:mb-20 mb-14 gap-4">
                {filterHandler(data?.cta_boxes)?.map((item, index) => (
                  <Link
                    target={item?.target || "_blank"}
                    href={item?.url ?? "/"}
                    key={index}
                    className={`transition-all duration-300 hover:scale-105 whitespace-nowrap px-5 py-3.5 shadow-sm xl:text-base text-sm font-normal rounded-full border 
                ${
                  item?.type === "Transparent"
                    ? "hover:border-transparent bg-transparent hover:bg-[#227BEF] hover:text-white border-black"
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
            className={`relative lg:w-2/5 w-full ${
              isVideo(data) && "cursor-pointer"
            }`}
            onClick={() => isVideo(data) && setIsModalOpen(!isModalOpen)}>
            <LazyLoadImage src={URL} altText={`Homepage Teaser Image`} />
            {isVideo(data) && (
              <Image
                src={PlayIcon}
                alt={"Background image"}
                height={1000}
                width={1000}
                className="w-[94px] h-[94px] z-40 absolute right-[41%] top-[41%] object-cover"
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
