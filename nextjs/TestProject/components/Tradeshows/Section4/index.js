import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const Section4 = ({ data, tabRef }) => {
  const getPredifindValue = (index) => {
    return data?.tradeshow_visitors?.data[index];
  };
  return (
    <section
      ref={tabRef}
      className="2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 pt-24 tradeshow_visitors_bg bg-white">
      <div className="md:w-4/5 w-full mb-14">
        <div className="uppercase text-talque-blue-color text-base font-bold md:mb-9 mb-3">
          {data?.visitor_blue_text}
        </div>
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:mb-10 mb-5`}>
          {data?.visitor_title}
        </div>
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
          {data?.visitor_description}
        </div>
      </div>
      <div className="xl:grid hidden grid-cols-3 pb-24">
        <div className="col-span-2">
          <div className="flex bg-white rounded-xl border pr-10 mb-5 overflow-hidden">
            <LazyLoadImage
              className="w-2/5"
              src={
                getPredifindValue(0)?.attributes?.image?.data?.attributes?.url
              }
              altText="Rectangle Icon"
            />
            <div className="w-3/5 flex flex-col ml-7 py-6">
              <div className="mb-[20px] text-2xl text-talque-primary-color font-semibold capitalize">
                {getPredifindValue(0)?.attributes?.title}
              </div>
              <div className="text-talque-secondary-color text-base mb-7">
                {getPredifindValue(0)?.attributes?.description}
              </div>
              <button className="bg-dark-blue text-white px-[20px] py-3.5 rounded-full text-center 2xl:w-3/5 xl:w-[70%] w-full">
                {getPredifindValue(0)?.attributes?.button?.label}
              </button>
            </div>
          </div>
          <div className="flex bg-white rounded-xl border pl-10 overflow-hidden">
            <div className="w-3/5 flex flex-col mr-7 py-6">
              <div className="mb-[20px] text-2xl text-talque-primary-color font-semibold capitalize">
                {getPredifindValue(2)?.attributes?.title}
              </div>
              <div className="text-talque-secondary-color text-base mb-7">
                {getPredifindValue(2)?.attributes?.description}
              </div>
              <button className="bg-dark-blue text-white px-[20px] py-[14px] rounded-full text-center 2xl:w-3/5 xl:w-[70%] w-full">
                {getPredifindValue(2)?.attributes?.button?.label}
              </button>
            </div>
            <LazyLoadImage
              className="w-2/5"
              src={
                getPredifindValue(2)?.attributes?.image?.data?.attributes?.url
              }
              altText="Rectangle Icon"
            />
          </div>
        </div>
        <div className="col-span-1 overflow-hidden">
          <div className="overflow-hidden flex flex-col items-center bg-white rounded-xl border ml-5 h-full">
            <LazyLoadImage
              className="h-[50%]"
              src={
                getPredifindValue(1)?.attributes?.image?.data?.attributes?.url
              }
              altText="Rectangle Icon"
            />
            <div className="h-[50%] flex flex-col mt-7 bg-white px-7 pb-10">
              <div className="mb-5 text-2xl text-talque-primary-color font-semibold capitalize">
                {getPredifindValue(1)?.attributes?.title}
              </div>
              <div className="text-talque-secondary-color text-base mb-[30px]">
                {getPredifindValue(1)?.attributes?.description}
              </div>
              <button className="bg-dark-blue text-white px-5 py-3.5 rounded-full text-center 2xl:w-4/5 xl:w-[90%] w-full ">
                {getPredifindValue(1)?.attributes?.button?.label}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile screen ui */}
      {data?.tradeshow_visitors?.data?.length > 0 && (
        <div className="xl:hidden grid lg:grid-cols-2 grid-cols-1 gap-8 pb-[30px]">
          {filterHandler(data?.tradeshow_visitors?.data)?.map((item, index) => {
            const { attributes } = item;
            return (
              <div
                className="overflow-hidden flex flex-col items-center bg-white rounded-xl border h-auto"
                key={index}>
                {attributes?.image?.data?.attributes?.url ? (
                  <LazyLoadImage
                    className="min-h-[250px] max-h-[250px]"
                    src={attributes?.image?.data?.attributes?.url}
                    altText="Rectangle Icon"
                  />
                ) : (
                  renderLogo("h-[50%]")
                )}
                <div className="flex flex-col mt-[30px] bg-white px-7 pb-10">
                  <div className="mb-5 text-2xl text-talque-primary-color font-semibold capitalize">
                    {attributes?.title}
                  </div>
                  <div className="text-talque-secondary-color text-base mb-[30px]">
                    {attributes?.description}
                  </div>
                  <button className="bg-dark-blue text-white px-5 py-3.5 rounded-full text-center 2xl:w-4/5 xl:w-[90%] w-full">
                    {attributes?.button?.label}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Section4;
