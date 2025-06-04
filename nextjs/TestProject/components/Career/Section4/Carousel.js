import { useEffect, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage, filterHandler, renderLogo } from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";

const Carousel = ({ CareerPageData }) => {
  const [combineArray, setCombineArray] = useState([]);

  const sliderConfig = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          variableWidth: false,
          slidesToShow: 5,
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

  const sliderConfig2 = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    variableWidth: false,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    className: "center",
    focusOnSelect: true,
    ...sliderGlobalConfig,
  };

  useEffect(() => {
    if (
      CareerPageData?.life_at_talque_images?.length > 0 &&
      CareerPageData?.life_at_talque_secondrow_images?.length > 0
    ) {
      const value = [
        ...CareerPageData?.life_at_talque_images,
        ...CareerPageData?.life_at_talque_secondrow_images,
      ];
      setCombineArray(value);
    } else {
      setCombineArray(CareerPageData?.life_at_talque_images);
    }
  }, [CareerPageData]);

  const renderSlider = (array, config) => {
    const settings = config ?? sliderConfig;
    return (
      <Slider {...settings}>
        {filterHandler(array)?.map((item, index) =>
          item?.image?.data?.attributes?.url ? (
            <LazyLoadImage
              key={index}
              className="h-[350px] object-cover md:pr-7"
              src={item?.image?.data?.attributes?.url}
              altText="Talque"
            />
          ) : (
            renderLogo("h-[350px] object-cover pr-7")
          )
        )}
      </Slider>
    );
  };

  return (
    <div>
      <div className="md:block hidden">
        {renderSlider(CareerPageData?.life_at_talque_images)}
        <div className="mt-8">
          {renderSlider(CareerPageData?.life_at_talque_secondrow_images)}
        </div>
      </div>
      <span className="carousel-center-lifetalque md:hidden block life_at_talque_carousel pb-20">
        {renderSlider(combineArray, sliderConfig2)}
      </span>
    </div>
  );
};

export default Carousel;
