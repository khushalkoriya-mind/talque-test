import React, { useState } from "react";
import PlayIcon from "@/public/images/play.svg";
import {
  MarkdownRenderer,
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import Image from "next/image";

const Section5 = ({ data }) => {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <section className="relative bg-[#F5F5F5] lg:pt-20 pt-10 md:pb-10 pb-0">
      <div className="w-full md:flex flex-col items-center 2xl:px-60 xl:px-36 lg:px-20 md:px-20 px-5">
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:mb-9 mb-3`}>
          {data?.title_4}
        </div>
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} 2xl:w-[65%] xl:w-4/5 w-full 2xl:text-center xl:text-center lg:text-center text-start`}>
          {data?.description_4}
        </div>
      </div>
      <div className="w-full md:pt-24 pt-8 lg:flex block gap-11 mb-20 2xl:px-60 xl:px-36 lg:px-20 md:px-20 px-5 overflow-scroll no-scrollbar">
        {filterHandler(data?.column_data)?.map((item, index) => (
          <div
            key={index}
            className="bg-white py-10 px-5 rounded-lg lg:w-[450px] w-full lg:min-h-[600px] max-h-[600px] overflow-y-auto lg:mb-0 mb-5">
            <div
              className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} mb-5`}>
              {item?.title}
            </div>
            {item?.description && (
              <div
                className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} text-talque-secondary-color`}>
                <MarkdownRenderer content={item?.description} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full h-full absolute lg:top-[62%] md:top-[65%] left-0 md:flex hidden flex-col items-center">
        <div className="h-full flex flex-row items-center text-4xl">
          <div className="rounded-xl w-full 2xl:px-64 xl:px-40 lg:px-24 md:px-24 px-5">
            {isVideo ? (
              <video
                autoPlay
                loop
                controls
                className="max-w-[1200px] min-w-[1200px] min-h-[600px] rounded-xl">
                <source
                  src={data?.video_file?.data?.attributes?.url}
                  type="video/webm"
                />
              </video>
            ) : (
              <div className="relative bg-gradient-to-r from-[#BF82E5] via-[#A387E2] to-[#848BDF] p-2 rounded-3xl">
                {data?.video_thumbnail?.data?.attributes?.url ? (
                  <LazyLoadImage
                    onClick={() => setIsVideo(!isVideo)}
                    className="w-screen h-[600px] rounded-3xl"
                    src={data?.video_thumbnail?.data?.attributes?.url}
                    altText="Why Talque"
                  />
                ) : (
                  renderLogo("w-screen h-[600px] rounded-3xl")
                )}

                <Image
                  onClick={() => setIsVideo(!isVideo)}
                  className="absolute top-[40%] lg:left-[50%] left-[43%] w-[100px] h-[100px] cursor-pointer"
                  src={PlayIcon}
                  alt="Why Talque"
                  height={1000}
                  width={1000}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile screen ui */}
      <div className="relative w-full md:hidden block">
        {isVideo ? (
          <video autoPlay loop controls className="w-full h-[230px]">
            <source
              src={data?.video_file?.data?.attributes?.url}
              type="video/webm"
            />
          </video>
        ) : (
          <div>
            <LazyLoadImage
              onClick={() => setIsVideo(!isVideo)}
              className="w-screen h-[230px]"
              src={data?.video_thumbnail?.data?.attributes?.url}
              altText="Why Talque"
            />

            <Image
              onClick={() => setIsVideo(!isVideo)}
              className="absolute top-[36%] left-[45%] w-[60px] h-[60px] cursor-pointer"
              src={PlayIcon}
              alt="Why Talque"
              height={1000}
              width={1000}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Section5;
