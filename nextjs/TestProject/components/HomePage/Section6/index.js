import { useState } from "react";
import ArrowLeft from "@/public/images/arrow-left.svg";
import ArrowRight from "@/public/images/arrow-right.svg";
import PlayIcon from "@/public/images/play.svg";
import Modal from "@/components/Common/Modal";
import { filterHandler, classes, LazyLoadImage } from "@/utils/helper";
import Image from "next/image";

const Section6 = ({ data }) => {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeSlide = (direction) => {
    setArrayIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      const maxIndex = data?.story_slider_data?.length - 1;

      if (newIndex > maxIndex) {
        return 0;
      }

      if (newIndex < 0) {
        return maxIndex;
      }

      return newIndex;
    });
  };

  return (
    <section className="homepage_check_value_bg lg:pt-20 pt-10 lg:pb-20 pb-0">
      <div className="flex flex-col lg:place-content-center place-content-start lg:items-center items-start text-white lg:mb-16 mb-10 px-5">
        <div className="uppercase text-xl lg:mb-10 mb-2 font-medium">
          {data?.story_small_title}
        </div>
        <div
          className={`capitalize lg:mb-10 mb-2 ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
          {data?.story_title}
        </div>
        <div
          className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
          {data?.story_description}
        </div>
      </div>
      {data?.story_slider_data?.length > 0 && (
        <div className="xl:flex justify-between 2xl:pr-60 xl:pr-12 items-center relative">
          <div className="relative">
            <LazyLoadImage
              className="2xl:w-[1080px] xl:w-[800px] 2xl:rounded-r-[110px] xl:rounded-r-[110px]"
              src={
                data?.story_slider_data[arrayIndex ?? 0]?.media_thumbnail?.data
                  ?.attributes?.url
              }
              altText="Teaser Image"
            />
            {data?.story_slider_data[arrayIndex ?? 0]?.file_type ===
              "Video" && (
              <Image
                onClick={() => setIsModalOpen(!isModalOpen)}
                style={{ transform: "translate(-50%, -50%)" }}
                className="absolute top-[50%] left-[50%] xl:w-[94px] w-[56px] cursor-pointer transition-all duration-300 hover:scale-105"
                src={PlayIcon}
                alt="Play Icon"
                height={1000}
                width={1000}
              />
            )}
          </div>

          <div className="flex items-center xl:place-content-end place-content-center xl:pt-0 pt-5 xl:!bg-transparent !bg-white">
            <Image
              onClick={() => changeSlide(-1)}
              className="w-[60px] h-[60px] 2xl:mr-14 xl:mr-10 mr-10 cursor-pointer transition-all duration-300 hover:scale-105"
              src={ArrowLeft}
              alt="Left Arrow"
              height={1000}
              width={1000}
            />

            <Image
              onClick={() => changeSlide(1)}
              className="w-[60px] h-[60px] cursor-pointer transition-all duration-300 hover:scale-105"
              src={ArrowRight}
              alt="Right Arrow"
              height={1000}
              width={1000}
            />
          </div>
          {/* mobile screen ui */}
          <div className="bg-white rounded-md lg:px-10 px-5 py-5 xl:hidden grid md:grid-cols-3 grid-cols-2 items-center gap-10 pt-10">
            {data?.story_data?.length > 0 &&
              filterHandler(data?.story_data)?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="text-[32px] font-semibold gradient_color">
                      {item?.title}
                    </div>
                    <div className="text-base font-medium">
                      {item?.description}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* desktop ui */}
          <div className="absolute top-[70%] 2xl:left-[36%] xl:left-[20%] bg-white rounded-md px-16 py-6 xl:flex lg:hidden hidden items-center">
            {data?.story_data?.length > 0 &&
              filterHandler(data?.story_data)?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      data?.story_data?.length - 1 !== index && "border-r-2"
                    } border-gray-200 px-16`}>
                    <div className="text-5xl font-semibold gradient_color mb-7">
                      {item?.title}
                    </div>
                    <div className="text-xl font-medium whitespace-nowrap">
                      {item?.description}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="md:pt-10 mt-0 lg:pb-0 pb-10 flex place-content-center xl:!bg-transparent !bg-white">
        <button
          className="relative overflow-hidden bg-gradient-to-r from-[#D17FE7] to-[#798DDE] rounded-full px-7 py-3.5 text-base text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#798DDE] hover:to-[#D17FE7]"
          onClick={() => handleLatestEmailUpdate()}>
          More best practices
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
        </button>
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          url={
            data?.story_slider_data[arrayIndex ?? 0]?.video_file?.data
              ?.attributes?.url
          }
        />
      )}
    </section>
  );
};

export default Section6;
