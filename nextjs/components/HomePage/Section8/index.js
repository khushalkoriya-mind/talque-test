import { useRef } from "react";
import Slider from "react-slick";
import ArrowLeft from "@/public/images/arrow-left.svg";
import ArrowRight from "@/public/images/arrow-right.svg";
import EventsIcon from "@/public/images/homepageeventsimg.svg";
import {
  filterHandler,
  getMonthString,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";
import Image from "next/image";

const sliderConfig = {
  dots: false,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 2,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
      },
    },
  ],
  ...sliderGlobalConfig,
};

const Section8 = ({ data, eventCalendar }) => {
  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="homepage_events_bg pt-20 pb-16">
      <div className="flex justify-between w-full 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:mb-10">
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} mb-10`}>
          {data?.event_calendar_title}
        </div>
        <div className="lg:flex hidden items-center">
          <Image
            onClick={prevSlide}
            className="w-[60px] h-[60px] mr-14 cursor-pointer"
            src={ArrowLeft}
            alt="Left Arrow"
            height={1000}
            width={1000}
          />

          <Image
            onClick={nextSlide}
            className="w-[60px] h-[60px] cursor-pointer"
            src={ArrowRight}
            alt="Right Arrow"
            height={1000}
            width={1000}
          />
        </div>
      </div>
      {eventCalendar?.length > 0 && (
        <div className="2xl:px-60 xl:px-14 lg:px-6 px-5">
          <Slider ref={sliderRef} {...sliderConfig}>
            {filterHandler(eventCalendar)?.map((item, index) => (
              <div
                key={index}
                className="shadow-md rounded-2xl lg:max-w-[430px] max-w-[350px] h-auto bg-white ml-4 mr-4 mb-4">
                <div className="bg-off-white h-[55%]">
                  {item?.attributes?.image?.data?.attributes?.url ? (
                    <LazyLoadImage
                      className="object-cover min-h-[50%] rounded-t-2xl bg-white"
                      src={item?.attributes?.image?.data?.attributes?.url}
                      altText="Homepage Background"
                    />
                  ) : (
                    renderLogo(
                      "object-cover min-h-[50%] rounded-t-2xl bg-white"
                    )
                  )}
                </div>
                <div className="px-4 bg-white mt-5 min-h-[50%]">
                  <div className="mb-4 flex items-center justify-start">
                    <div className="text-base mr-4 flex flex-col items-center">
                      {item?.attributes?.date && (
                        <div className="text-talque-blue-color font-semibold lg:!leading-9 !leading-6 text-2xl">
                          {new Date(item?.attributes?.date).getDate()}
                        </div>
                      )}
                      {item?.attributes?.date && (
                        <div className="text-black text-base font-medium">
                          {getMonthString(item?.attributes?.date)}
                        </div>
                      )}
                    </div>
                    <div className="text-talque-primary-color text-xl font-semibold border-l-2 border-l-[#227BEF] pl-4">
                      {item?.attributes?.title}
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center justify-start mt-4 mb-6">
                    <Image
                      className="object-cover min-w-[32px] max-w-[32px] mr-5"
                      src={EventsIcon}
                      alt="Events"
                      height={1000}
                      width={1000}
                    />
                    <div className="text-talque-secondary-color text-base">
                      {item?.attributes?.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div className="place-content-center xl:mt-0 mt-10 flex">
        <button className="relative overflow-hidden text-white rounded-full px-10 py-5 bg-gradient-to-tr from-[#D17FE7] to-[#798DDE] text-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#798DDE] hover:to-[#D17FE7]">
          {data?.event_calendar_cta_box?.label}
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
        </button>
      </div>
    </div>
  );
};

export default Section8;
