import Slider from "react-slick";
import QuoteIcon from "@/public/images/fa-solid_quote-left.svg";
import ArrowLeft from "@/public/images/arrow-left.svg";
import ArrowRight from "@/public/images/arrow-right.svg";
import {
  LazyLoadImage,
  classes,
  filterHandler,
  renderLogo,
} from "@/utils/helper";
import { sliderGlobalConfig } from "@/utils/constant";
import Image from "next/image";

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <Image
        className="w-[60px] h-[60px] transition-all duration-300 hover:scale-105"
        src={ArrowLeft}
        alt="Right Arrow"
        height={1000}
        width={1000}
      />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <Image
        className="w-[60px] h-[60px] transition-all duration-300 hover:scale-105"
        src={ArrowRight}
        alt="Left Arrow"
        height={1000}
        width={1000}
      />
    </div>
  );
};

const sliderConfig = {
  dots: false,
  arrows: true,
  slidesToShow: 1,
  variableWidth: true,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "60px",
  className: "center",
  focusOnSelect: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  ...sliderGlobalConfig,
};

const index = ({ clientTestimonials }) => {
  return (
    <section className="tradeshow_customer_voice_bg lg:py-32 py-16 z-20">
      <div className="px-5 flex flex-col lg:items-center items-start">
        <div className="text-talque-blue-color text-base uppercase font-bold lg:mb-9 mb-3">
          customer voice
        </div>
        <div
          className={`text-talque-primary-color lg:mb-24 mb-7 ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
          What Our Client say about us
        </div>
      </div>
      {clientTestimonials?.length > 0 && (
        <div className="lg:block hidden client_testimonials">
          <Slider {...sliderConfig}>
            {filterHandler(clientTestimonials)?.map((item, index) => {
              const { attributes, id } = item;
              return (
                <div
                  className="!bg-white px-10 py-14 max-w-[750px] max-h-[370px] rounded-xl shadow-md overflow-hidden"
                  key={index}>
                  <div
                    className={`mb-[30px] text-talque-primary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
                    {attributes?.top_description}
                  </div>
                  <div className="flex items-center relative">
                    <div>
                      {attributes?.profile_picture?.data?.attributes?.url ? (
                        <LazyLoadImage
                          className="rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] mr-7"
                          src={
                            attributes?.profile_picture?.data?.attributes?.url
                          }
                          altText="Client Profile Picture"
                        />
                      ) : (
                        renderLogo(
                          "rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] mr-7"
                        )
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div
                        className={`text-talque-primary-color text-xl font-semibold`}>
                        {attributes?.name}
                      </div>
                      <div className="text-talque-blue-color text-base font-bold">
                        {attributes?.location}
                      </div>
                    </div>

                    <Image
                      className="min-w-[85px] w-[90px] absolute -right-10 top-0"
                      src={QuoteIcon}
                      alt="Testimonial Quote"
                      height={1000}
                      width={1000}
                    />
                  </div>

                  <LazyLoadImage
                    className="rounded-full min-w-[85px] min-h-[16px] max-w-[85px] max-h-[16px] ml-[13%] mt-4"
                    src={attributes?.company_logo?.data?.attributes?.url}
                    altText="Profile Picture"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      )}
      {/* mobile screen ui */}
      {clientTestimonials?.length > 0 && (
        <div className="2xl:hidden xl:hidden lg:hidden flex overflow-auto no-scrollbar justify-start px-5 pb-6">
          {filterHandler(clientTestimonials)?.map((item, index) => {
            const { attributes, id } = item;
            return (
              <div
                className="bg-white p-5 min-w-[310px] min-h-[295px] mr-5 rounded-xl shadow-md overflow-ellipsis"
                key={index}>
                <div
                  className={`mb-7 text-talque-primary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} h-[60%]`}>
                  {attributes?.top_description}
                </div>
                <div className="flex items-center h-[40%]">
                  <div>
                    {attributes?.profile_picture?.data?.attributes?.url ? (
                      <LazyLoadImage
                        className="rounded-full min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] mr-5"
                        src={attributes?.profile_picture?.data?.attributes?.url}
                        altText="Profile Picture"
                      />
                    ) : (
                      renderLogo(
                        "rounded-full min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] mr-5"
                      )
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-talque-primary-color text-sm font-semibold">
                      {attributes?.name}
                    </div>
                    <div className="text-talque-blue-color text-xs font-bold">
                      {attributes?.location}
                    </div>

                    <LazyLoadImage
                      className="rounded-full min-w-[58px] min-h-[11px] max-w-[58px] max-h-[11px]"
                      src={attributes?.company_logo?.data?.attributes?.url}
                      altText="Profile Picture"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default index;
