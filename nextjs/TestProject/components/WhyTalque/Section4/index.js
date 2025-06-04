import {
  LazyLoadImage,
  MarkdownRenderer,
  filterHandler,
  renderLogo,
} from "@/utils/helper";

const Section4 = ({ data, afterData }) => {
  const renderImage = (item) => {
    return (
      <div className="w-1/2">
        {item?.attributes?.image?.data?.attributes?.url ? (
          <LazyLoadImage
            className="xl:w-[600px] lg:w-[400px] h-auto"
            src={item?.attributes?.image?.data?.attributes?.url}
            altText="Rectangle Icon"
          />
        ) : (
          renderLogo("xl:w-[600px] lg:w-[400px] h-auto")
        )}
      </div>
    );
  };

  const renderTextPart = (item) => {
    return (
      <div className="w-1/2">
        <div
          className={`mb-10 2xl:text-[32px] xl:text-[28px] lg:text-xl text-talque-primary-color font-semibold capitalize`}>
          {item?.attributes?.title}
        </div>
        {item?.attributes?.description && (
          <div className="text-talque-secondary-color xl:text-base lg:text-lg">
            <MarkdownRenderer content={item?.attributes?.description} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="2xl:px-60 xl:px-36 lg:px-28 px-5 md:pt-24 pt-11 pb-11 bg-white">
      {afterData?.length > 0 && (
        <div className="lg:block hidden">
          {filterHandler(afterData)?.map((item, index) => (
            <div key={index} className="flex gap-48 items-center w-full mb-20">
              {index % 2 === 0 ? renderImage(item) : renderTextPart(item)}
              {index % 2 === 0 ? renderTextPart(item) : renderImage(item)}
            </div>
          ))}
        </div>
      )}
      {/* mobile screen ui */}
      {afterData?.length > 0 && (
        <div className="lg:hidden block">
          {filterHandler(afterData)?.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-12">
              {item?.attributes?.image?.data?.attributes?.url ? (
                <LazyLoadImage
                  src={item?.attributes?.image?.data?.attributes?.url}
                  altText="Rectangle Icon"
                />
              ) : (
                renderLogo("")
              )}
              <div>
                <div className="mb-3 text-lg text-talque-primary-color font-semibold capitalize">
                  {item?.attributes?.title}
                </div>
                {item?.attributes?.description && (
                  <div
                    className={`text-talque-secondary-color text-sm ${
                      afterData?.length - 1 !== index && "mb-14"
                    }`}>
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

export default Section4;
