import Journey from "@/components/Tradeshows/Section3/Journey";
import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const Section3 = ({ data, tabRef }) => {
  const renderTextValue = (item) => {
    return (
      <>
        <div
          className={`break-words text-talque-primary-color ${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} 2xl:mb-7 xl:mb-5 lg:mb-3`}>
          {item?.attributes?.title}
        </div>
        <div
          className={`break-words text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
          {item?.attributes?.description}
        </div>
      </>
    );
  };

  const renderImage = (item) => {
    return item?.attributes?.image?.data?.attributes?.url ? (
      <LazyLoadImage
        src={item?.attributes?.image?.data?.attributes?.url}
        altText="Circle Icon"
      />
    ) : (
      renderLogo("")
    );
  };

  return (
    <section ref={tabRef} className="bg-off-white">
      <div className="2xl:px-60 xl:px-14 lg:px-6 px-5 pt-20 pb-20 flex flex-col lg:items-center lg:justify-center justify-start items-start">
        <div
          className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} text-talque-primary-color md:mb-10 mb-5 2xl:w-1/2 xl:w-[65%] lg:w-[90%] w-full text-center`}>
          {data?.organiser_title}
        </div>
        <div
          className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} text-talque-secondary-color 2xl:w-1/2 xl:w-[65%] lg:w-[90%] w-full text-center`}>
          {data?.organiser_description}
        </div>
      </div>
      {data?.tradeshow_organisers?.data?.length > 0 && (
        <div className="lg:block hidden">
          {filterHandler(data?.tradeshow_organisers?.data)?.map(
            (item, index) => (
              <div key={index} className="flex items-center w-full">
                {index % 2 !== 0 && <div className="w-[10%]" />}
                <div
                  className={`2xl:px-60 xl:px-36 lg:px-14 py-10 bg-white ${
                    index % 2 === 0 ? "rounded-r-full" : "rounded-l-full"
                  } flex items-center w-[90%] mb-12`}>
                  {index % 2 !== 0 && (
                    <>
                      <div className="w-3/5 2xl:mr-20 xl:mr-14 lg:mr-6">
                        {renderTextValue(item)}
                      </div>
                      <div className="w-2/5 h-auto 2xl:mr-20 xl:mr-14 lg:mr-6 border-[#D17FE7] border-8 p-4 rounded-xl bg-white">
                        {renderImage(item)}
                      </div>
                    </>
                  )}
                  {index % 2 === 0 && (
                    <>
                      <div className="w-2/5 h-auto 2xl:mr-20 xl:mr-14 lg:mr-6 border-[#D17FE7] border-8 p-4 rounded-xl bg-white">
                        {renderImage(item)}
                      </div>
                      <div className="w-3/5">{renderTextValue(item)}</div>
                    </>
                  )}
                </div>
                {index % 2 === 0 && <div className="w-[10%]" />}
              </div>
            )
          )}
        </div>
      )}
      {/* mobile screen ui */}
      {data?.tradeshow_organisers?.data?.length > 0 && (
        <div className="lg:hidden grid md:grid-cols-2 grid-cols-1 gap-5 px-5">
          {filterHandler(data?.tradeshow_organisers?.data)?.map(
            (item, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  data?.tradeshow_organisers?.data?.length - 1 !== index &&
                  "mb-5"
                }`}>
                {item?.attributes?.image?.data?.attributes?.url ? (
                  <LazyLoadImage
                    className="border-[#D17FE7] border-8 p-4 rounded-xl bg-white mb-7"
                    src={item?.attributes?.image?.data?.attributes?.url}
                    altText="Circle Icon"
                  />
                ) : (
                  renderLogo(
                    "border-[#D17FE7] border-8 p-4 rounded-xl bg-white mb-7"
                  )
                )}
                <div className="text-talque-primary-color text-lg font-semibold mb-[20px]">
                  {item?.attributes?.title}
                </div>
                <div className="text-talque-secondary-color text-sm">
                  {item?.attributes?.description}
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className="md:pt-12 pt-6">
        <Journey data={data} />
      </div>
    </section>
  );
};

export default Section3;
