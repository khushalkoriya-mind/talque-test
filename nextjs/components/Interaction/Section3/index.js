import {
  MarkdownRenderer,
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const Section3 = ({ data, featureList }) => {
  const renderImage = (item) => {
    return item?.attributes?.image?.data?.attributes?.url ? (
      <LazyLoadImage
        className="2xl:w-[670px] xl:w-[500px] lg:w-[500px]"
        src={item?.attributes?.image?.data?.attributes?.url}
        altText="Interactions"
      />
    ) : (
      renderLogo("2xl:w-[670px] xl:w-[500px] lg:w-[500px]")
    );
  };

  const renderTextPart = (item) => {
    return (
      <div>
        <div className="mb-5 2xl:text-[28px] xl:text-[34px] lg:text-[30px] text-talque-primary-color font-semibold capitalize">
          {item?.attributes?.title}
        </div>
        {item?.attributes?.description && (
          <div className="text-talque-secondary-color lg:text-sm mb-5">
            <MarkdownRenderer content={item?.attributes?.description} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="md:pt-24 pt-11 bg-white">
      <div className="w-full md:flex flex-col items-center px-5">
        <div
          className={`capitalize 2xl:w-[45%] xl:w-[55%] lg:w-[65%] w-full lg:text-center text-start text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
          {data?.title_3}
        </div>
      </div>

      {featureList?.length > 0 && (
        <div className="lg:block hidden mt-10">
          {filterHandler(featureList)?.map((item, index) => (
            <div key={index} className="flex gap-14 items-center mb-20">
              {index % 2 === 0 ? (
                <div className="rounded-r-2xl 2xl:pl-60 xl:pl-36 lg:pl-28 md:pl-20 pl-5 2xl:py-8 xl:py-10 lg:py-10 md:py-10 py-5 md:pr-10 pr-5 interaction_data_bg_1">
                  {renderImage(item)}
                </div>
              ) : (
                <div className="2xl:pl-60 xl:pl-36 lg:pl-28 md:pl-20 pl-5">
                  {renderTextPart(item)}
                </div>
              )}
              {index % 2 === 0 ? (
                <div className="2xl:pr-60 xl:pr-36 lg:pr-28 md:pr-20 pr-5">
                  {renderTextPart(item)}
                </div>
              ) : (
                <div className="rounded-l-2xl 2xl:pr-60 xl:pr-36 lg:pr-28 md:pr-20 pr-5 2xl:py-8 xl:py-10 lg:py-10 md:py-10 py-5 md:pl-10 pl-5 interaction_data_bg_1">
                  {renderImage(item)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* mobile screen ui */}
      {featureList?.length > 0 && (
        <div className="lg:hidden block px-5">
          {filterHandler(featureList)?.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item?.attributes?.image?.data?.attributes?.url ? (
                <LazyLoadImage
                  src={item?.attributes?.image?.data?.attributes?.url}
                  altText="Interactions"
                />
              ) : (
                renderLogo("")
              )}
              <div>
                <div className="mt-5 mb-5 text-lg text-talque-primary-color font-semibold capitalize">
                  {item?.attributes?.title}
                </div>
                {item?.attributes?.description && (
                  <div className="text-talque-secondary-color text-sm mb-5">
                    <MarkdownRenderer content={item?.attributes?.description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Section3;
