import { useRef, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage, filterHandler } from "@/utils/helper";
import Image from "next/image";

const Carousel = ({ teamData }) => {
  const sliderRef = useRef(null);
  const [hoverImageIndex, setHoverImageIndex] = useState(0);
  const [centerImageIndex, setCenterImageIndex] = useState(4);
  const [mainImageIndex, setMainImageIndex] = useState(4);

  const commonConfig = {
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true,
  };

  const sliderConfigMobile = {
    infinite: true,
    autoplay: true,
    centerMode: true,
    centerPadding: "60px",
    className: "center",
    focusOnSelect: true,
    afterChange: (index) => {
      if (sliderRef.current) {
        const slick = sliderRef.current;
        const centerSlideIndex = slick.innerSlider.state.currentSlide;
        setCenterImageIndex(centerSlideIndex);
      }
    },
    ...commonConfig,
  };

  const sliderConfigDesktop = {
    centerMode: false,
    focusOnSelect: false,
    autoplay: false,
    infinite: false,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 6,
    variableWidth: true,
  };

  return (
    <div className="w-full md:mt-10 md:mb-10 mb-0 mt-5 get_to_know_team carousel-center-gettoknowteam">
      <div className="md:block hidden">
        <Slider ref={sliderRef} {...sliderConfigDesktop}>
          {filterHandler(teamData)?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                mainImageIndex === idx || hoverImageIndex === idx
                  ? "carousel-hover-image"
                  : "gray-shadow"
              } focus-within:outline-none focus:outline-none cursor-pointer`}>
              <Image
                onClick={() => setMainImageIndex(idx)}
                onMouseOver={() => setHoverImageIndex(idx)}
                key={idx}
                className={`md:h-[430px] h-[260px] ${
                  mainImageIndex === idx ? "!w-full" : "md:w-[150px] w-full"
                } object-cover`}
                src={
                  mainImageIndex === idx
                    ? item?.attributes?.full_profile_picture?.data?.attributes
                        ?.url
                    : item?.attributes?.profile_picture?.data?.attributes?.url
                }
                alt="My Team"
                height={1000}
                width={1000}
              />
              {mainImageIndex === idx && (
                <div className="py-3 px-6 get_to_know_the_team_bg font-medium w-full">
                  <div className="text-black w-auto md:text-2xl text-base md:mb-4 mb-3">
                    {item?.attributes?.title}
                  </div>
                  <div className="md:text-base text-xs text-white">
                    {item?.attributes?.position}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:hidden block">
        <Slider ref={sliderRef} {...sliderConfigMobile}>
          {filterHandler(teamData)?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                idx !== centerImageIndex &&
                idx !== hoverImageIndex &&
                "gray-shadow"
              } ${
                hoverImageIndex === idx &&
                idx !== centerImageIndex &&
                "carousel-hover-image"
              } focus-within:outline-none focus:outline-none`}>
              <LazyLoadImage
                onClick={() => setCenterImageIndex(idx)}
                onMouseOver={() => setHoverImageIndex(idx)}
                key={idx}
                className={`md:h-[430px] h-[260px] ${
                  centerImageIndex === idx ? "!w-full" : "md:w-[150px] w-full"
                } object-cover`}
                src={
                  centerImageIndex === idx
                    ? item?.attributes?.full_profile_picture?.data?.attributes
                        ?.url
                    : item?.attributes?.profile_picture?.data?.attributes?.url
                }
                altText="My Team"
              />
              {centerImageIndex === idx && (
                <div className="py-3 px-6 get_to_know_the_team_bg font-medium w-full">
                  <div className="text-black w-auto md:text-2xl text-base md:mb-4 mb-3">
                    {item?.attributes?.title}
                  </div>
                  <div className="md:text-base text-xs text-white">
                    {item?.attributes?.position}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
