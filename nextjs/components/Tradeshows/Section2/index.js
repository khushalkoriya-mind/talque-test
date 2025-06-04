import Details from "./details";
import HotSpotCircle from "@/components/Common/HotSpotCircle";
import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const Section2 = ({ data, trustPartnerLogos, hotSpot, tabRef }) => {
  return (
    <section ref={tabRef}>
      <div className="2xl:pt-36 xl:pt-36 lg:pt-36 md:pt-36 pt-16 2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 tradeshow_why_talque_bg">
        <div className="xl:w-[66%] lg:w-[70%] w-full">
          <div
            className={`md:mb-10 mb-5 ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} text-talque-primary-color`}>
            {data?.why_talque_title}
          </div>
          <div
            className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} mb-14`}>
            {data?.why_talque_description}
          </div>
        </div>
        {hotSpot?.length > 0 && (
          <HotSpotCircle hotSpot={hotSpot} className="pb-36" />
        )}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <div
            className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} text-talque-primary-color capitalize md:mb-10 mb-5 lg:w-[75%] w-full`}>
            {data?.why_talque_second_title}
          </div>
          <div
            className={`text-talque-secondary-color mb-[60px] xl:w-4/5 lg:w-[85%] w-full ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
            {data?.why_talque_second_description}
          </div>
          {trustPartnerLogos?.length > 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 items-center gap-[20px] md:pb-32 pb-12">
              {filterHandler(trustPartnerLogos)?.map((item, index) => (
                <div key={index}>
                  {item?.attributes?.image?.data?.attributes?.url ? (
                    <LazyLoadImage
                      className="col-span-1 md:w-[180px] w-full md:h-[90px] h-[120px]"
                      src={item?.attributes?.image?.data?.attributes?.url}
                      altText="Tradeshows"
                    />
                  ) : (
                    renderLogo(
                      "col-span-1 w-[250px] md:w-[180px] md:h-[90px] h-[120px]"
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Details data={data} />
    </section>
  );
};

export default Section2;
