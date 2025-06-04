import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage, classes, filterHandler } from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";

const ThreeBoxes = ({ CareerPageData }) => {
  const [list, setList] = useState([]);

  const sliderConfig = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...sliderGlobalConfig,
  };

  useEffect(() => {
    setList(CareerPageData?.three_boxes?.slice(0, 3));
  }, [CareerPageData]);

  const renderMobileBox = () => {
    return (
      <div className="lg:hidden md:hidden flex flex-col ml-6 what_we_offer_bg pb-5 three-box-wi">
        <Slider {...sliderConfig}>
          {filterHandler(list)?.map((item, index) => (
            <div key={index} className="mr-4 !w-auto">
              <div
                className="bg-white shadow-sm rounded-2xl p-[20px] flex flex-col gap-y-9 overflow-hidden h-[300px] w-auto"
                key={index}>
                {item?.box_icon?.data?.attributes?.url && (
                  <LazyLoadImage
                    className="w-[50px] h-[50px] border border-[#0000001A] rounded-full p-3 shadow-sm bg-[#FFF]"
                    src={item?.box_icon?.data?.attributes?.url}
                    altText="Box"
                  />
                )}
                <div className="flex flex-col gap-y-2">
                  <div className="font-semibold text-lg capitalize">
                    {item?.box_title}
                  </div>

                  <div className="w-auto h-[160px] overflow-hidden ">
                    <p className="overflow-ellipsis text-sm font-normal text-talque-secondary-color">
                      {item?.box_description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <>
      <div className="absolute 2xl:-bottom-[44%] xl:-bottom-[40%] lg:-bottom-[35%] md:-bottom-[27%] xl:left-[10%] lg:left-[12%] md:left-[12%]">
        <div className="2xl:flex xl:flex lg:flex md:flex hidden  items-center gap-x-11">
          {filterHandler(list)?.map((item, index) => (
            <div
              className="2xl:h-[380px] 2xl:w-[450px] xl:h-[300px] xl:w-[350px] lg:h-[200px] lg:w-[250px] md:w-[190px] md:h-[180px] bg-white shadow-sm rounded-2xl xl:p-[30px] lg:p-[20px] md:p-[18px] flex flex-col xl:gap-y-9 lg:gap-y-2 md:gap-y-2 overflow-hidden"
              key={index}>
              {item?.box_icon?.data?.attributes?.url && (
                <div>
                  <LazyLoadImage
                    className="2xl:w-[80px] 2xl:h-[80px] xl:h-[65px] xl:w-[65px] lg:w-[50px] lg:h-[50px] md:w-[45px] md:h-[45px] border border-[#0000001A] rounded-full p-3 shadow-sm bg-[#FFF] three_box_image_shadow"
                    src={item?.box_icon?.data?.attributes?.url}
                    altText="Box"
                  />
                </div>
              )}
              <div className="flex flex-col xl:gap-y-4 lg:gap-y-2 md:gap-y-1">
                <div
                  className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} capitalize`}>
                  {item?.box_title}
                </div>
                <div className="2xl:h-[400px] 2xl:w-[400px] xl:h-[78px] xl:w-[300px] lg:h-[35px] lg:w-[200px] md:w-[150px] md:h-[60px] overflow-hidden">
                  <p
                    className={`overflow-ellipsis ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} text-talque-secondary-color`}>
                    {item?.box_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>{renderMobileBox()}</div>
    </>
  );
};

export default ThreeBoxes;
