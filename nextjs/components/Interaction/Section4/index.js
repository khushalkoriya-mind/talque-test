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
  infinite: true,
  arrows: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  variableWidth: false,
  autoplay: true,
  autoplaySpeed: 2000,
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

const Section4 = ({ data }) => {
  return (
    <div className="2xl:px-60 xl:px-14 lg:px-6 px-5 lg:py-20 py-10 bg-[#F5F5F5] interaction_section">
      <div
        className={`xl:!text-4xl lg:text-3xl md:text-2xl text-xl ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} capitalize mb-10 lg:text-center text-start`}>
        {data?.title_4}
      </div>

      {data?.customer_data?.length > 0 && (
        <Slider {...sliderConfig}>
          {filterHandler(data?.customer_data)?.map((item, index) =>
            item?.logo?.data?.attributes?.url ? (
              <LazyLoadImage
                className="min-w-[160px] max-w-[160px] h-[40px]"
                key={index}
                src={item?.logo?.data?.attributes?.url}
                altText="Interactions"
              />
            ) : (
              renderLogo("min-w-[160px] max-w-[160px] h-[40px]")
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default Section4;
