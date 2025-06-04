import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import Revenue from "@/components/Tradeshows/Section5/Revenue";

const Section5 = ({ data, tabRef }) => {
  const renderImage = (item) => {
    return item?.attributes?.image?.data?.attributes?.url ? (
      <LazyLoadImage
        className="2xl:w-[622px] xl:w-[500px] lg:w-[400px] h-[430px]"
        src={item?.attributes?.image?.data?.attributes?.url}
        altText="Rectangle Icon"
      />
    ) : (
      renderLogo("2xl:w-[622px] xl:w-[500px] lg:w-[400px] h-[430px]")
    );
  };

  const renderTextPart = (item) => {
    const { attributes } = item;
    return (
      <div>
        <div className="mb-5 2xl:text-[42px] xl:text-[38px] lg:text-3xl text-talque-primary-color font-semibold capitalize">
          {attributes?.title}
        </div>
        <div
          className={`text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} mb-5`}>
          {attributes?.description}
        </div>
        <button className="bg-dark-blue text-white px-[40px] py-[15px] rounded-full text-center font-medium w-auto flex items-center">
          {attributes?.button?.label}
        </button>
      </div>
    );
  };

  return (
    <>
      <section
        ref={tabRef}
        className="2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 2xl:pt-24 xl:pt-24 lg:pt-24 md:pt-24 pt-11 bg-[#F5F5F5] tradeshow_for_exhibitors_bg">
        <div className="w-full md:flex flex-col items-center">
          <div
            className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} mb-9`}>
            {data?.exhibitor_title}
          </div>
          <div
            className={`text-talque-secondary-color 2xl:w-[65%] xl:w-4/5 w-full ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
            {data?.exhibitor_description}
          </div>
        </div>
        {data?.tradeshow_exhibitors?.data?.length > 0 && (
          <div className="lg:block hidden mt-10">
            {filterHandler(data?.tradeshow_exhibitors?.data)?.map(
              (item, index) => (
                <div key={index} className="flex gap-14 items-center">
                  {index % 2 === 0 ? renderImage(item) : renderTextPart(item)}
                  {index % 2 === 0 ? renderTextPart(item) : renderImage(item)}
                </div>
              )
            )}
          </div>
        )}
        {/* mobile screen ui */}
        {data?.tradeshow_exhibitors?.data?.length > 0 && (
          <div className="lg:hidden block px-5">
            {filterHandler(data?.tradeshow_exhibitors?.data)?.map(
              (item, index) => {
                const { attributes, id } = item;
                return (
                  <div key={index} className="flex flex-col items-center">
                    {attributes?.image?.data?.attributes?.url ? (
                      <LazyLoadImage
                        className="w-[500px] h-[270px]"
                        src={attributes?.image?.data?.attributes?.url}
                        altText="Rectangle Icon"
                      />
                    ) : (
                      renderLogo("w-[500px] h-[270px]")
                    )}
                    <div>
                      <div className="mb-5 text-lg text-talque-primary-color font-semibold capitalize">
                        {attributes?.title}
                      </div>
                      <div className="text-talque-secondary-color text-sm mb-5">
                        {attributes?.description}
                      </div>
                      <button
                        className={`bg-dark-blue text-white px-5 py-3 rounded-full text-center font-medium w-auto flex items-center ${
                          data?.tradeshow_exhibitors?.data?.length - 1 ===
                            index && "mb-10"
                        }`}>
                        {attributes?.button?.label}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
      <Revenue data={data} />
    </>
  );
};

export default Section5;
