import Slider from "react-slick";
import { LazyLoadImage, filterHandler, renderLogo } from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";

const sliderConfig = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 2,
  variableWidth: true,
  ...sliderGlobalConfig,
};

const Section2 = ({ solutions }) => {
  return (
    <div className="bg-black">
      <Slider {...sliderConfig}>
        {filterHandler(solutions).map((item, index) => (
          <div
            key={index}
            className="text-white font-medium text-lg !flex items-center mr-9 py-5 px-0 uppercase">
            <div>
              {item?.attributes?.image?.data?.attributes?.url ? (
                <LazyLoadImage
                  src={item?.attributes?.image?.data?.attributes?.url}
                  altText={`Solutions`}
                  className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] mr-9"
                />
              ) : (
                renderLogo(
                  "min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] mr-9"
                )
              )}
            </div>
            <div>{item?.attributes?.label}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section2;
