import Slider from "react-slick";
import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";

const sliderConfig = {
  dots: false,
  arrows: false,
  slidesToShow: 4,
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

const Section5 = ({ data, solutionBox }) => {
  return (
    <div className="homepage_checkout_ways_bg lg:pt-20 pt-10">
      <div className="flex flex-col 2xl:w-3/5 xl:w-4/5 lg:w-[90%] w-full 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:mb-16 mb-10">
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} 2xl:mb-10 xl:mb-10 lg:mb-10 mb-5`}>
          {data?.use_talque_title}
        </div>
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
          {data?.use_talque_subtitle}
        </div>
      </div>
      {solutionBox?.length > 0 && (
        <div className="2xl:pl-60 xl:pl-14 lg:pl-12 pl-5">
          <Slider {...sliderConfig}>
            {filterHandler(solutionBox)?.map((item, index) => (
              <div
                key={index}
                className="mb-12 homepage-sec6-hover rounded-2xl 2xl:max-w-[380px] xl:max-w-[440px] lg:max-w-[440px] max-w-[320px] h-auto bg-white p-2 ml-2 mr-8">
                <div className="bg-off-white h-[55%]">
                  {item?.attributes?.image?.data?.attributes?.url ? (
                    <LazyLoadImage
                      className="object-cover h-[215px] w-[420px] rounded-t-2xl bg-white"
                      src={item?.attributes?.image?.data?.attributes?.url}
                      altText={`Homepage Background`}
                    />
                  ) : (
                    renderLogo(
                      "object-cover h-[215px] w-[420px] rounded-t-2xl bg-white"
                    )
                  )}
                </div>
                <div className="px-2 bg-white mt-7">
                  <div
                    className={`text-talque-primary-color ${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} mb-4`}>
                    {item?.attributes?.title}
                  </div>
                  <div
                    className={`text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
                    {item?.attributes?.description}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Section5;
