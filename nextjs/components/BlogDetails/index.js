import {
  LazyLoadImage,
  MarkdownRenderer,
  classes,
  dateTimeFormat,
  filterHandler,
  renderLogo,
} from "@/utils/helper";
import Link from "next/link";

const BlogDetails = ({ blogDetail }) => {
  const renderImage = (item, className) => {
    return item?.image?.data?.attributes?.url ? (
      <LazyLoadImage
        className={`object-cover lg:w-1/2 w-full ${className}`}
        src={item?.image?.data?.attributes?.url}
        altText="Blog"
      />
    ) : (
      renderLogo(`object-cover lg:w-1/2 w-full ${className}`)
    );
  };

  const renderText = (item) => {
    return (
      <div className="lg:w-1/2 w-full">
        {item?.content && <MarkdownRenderer content={item?.content} />}
      </div>
    );
  };

  return (
    <section className="bg-white 2xl:px-80 xl:px-14 px-5 2xl:py-24 xl:py-24 lg:py-24 py-6">
      <div
        className={`${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"} md:mb-10 mb-4`}>
        {blogDetail?.blog_title}
      </div>
      <div className="flex items-center md:mb-14 mb-5 md:gap-7 gap-3 md:text-base text-xs">
        <div className="text-talque-blue-color uppercase bg-[#227BEF26] md:px-7 px-4 md:py-2.5 py-2 rounded-full">
          {blogDetail?.blog_tag?.data?.attributes?.title}
        </div>
        {blogDetail?.blog_date && (
          <div className="text-talque-secondary-color font-medium">
            {dateTimeFormat(blogDetail?.blog_date)}
          </div>
        )}
      </div>
      {blogDetail?.blog_image?.data?.attributes?.url ? (
        <LazyLoadImage
          className="object-cover w-full h-full md:mb-16 mb-5 max-h-[600px]"
          src={blogDetail?.blog_image?.data?.attributes?.url}
          altText="Blog"
        />
      ) : (
        renderLogo("object-cover w-full h-full md:mb-16 mb-5 max-h-[600px]")
      )}
      <div className="md:text-base text-sm font-normal text-talque-secondary-color">
        {blogDetail?.blog_text}
      </div>
      {blogDetail?.blog_images?.length > 0 && (
        <div className="lg:flex hidden flex-col gap-20">
          {filterHandler(blogDetail?.blog_images)?.map((item, index) => (
            <div key={index}>
              {item?.image &&
                !item?.content &&
                renderImage(item, "!w-full h-full mt-10")}
              {item?.image && item?.content && (
                <div className="w-full flex gap-20 items-center">
                  {index % 2 === 0 ? (
                    <>
                      {renderImage(item)}
                      {renderText(item)}
                    </>
                  ) : (
                    <>
                      {renderText(item)}
                      {renderImage(item)}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* mobile screen ui */}
      {blogDetail?.blog_images?.length > 0 && (
        <div className="lg:hidden flex flex-col gap-5">
          {filterHandler(blogDetail?.blog_images)?.map((item, index) => (
            <div key={index}>
              {item?.image &&
                !item?.content &&
                renderImage(item, "!w-full h-full my-5")}
              {item?.image && item?.content && (
                <div className="w-full flex flex-col gap-5 items-center">
                  <div>
                    {renderText(item)}
                    {renderImage(item)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {blogDetail?.social_media_platforms?.data?.length > 0 && (
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center bg-off-white py-5 px-7 border rounded-lg mt-14">
          <div className="md:text-2xl text-lg font-medium">
            Share this blog:
          </div>
          <div className="flex items-center gap-5">
            {filterHandler(blogDetail?.social_media_platforms?.data)?.map(
              (item, index) =>
                item?.attributes?.image?.data?.attributes?.url ? (
                  <Link
                    key={index}
                    target={item?.attributes?.target}
                    href={item?.attributes?.redirect_url}>
                    <LazyLoadImage
                      className="object-cover min-w-[40px] max-w-[40px]"
                      src={item?.attributes?.image?.data?.attributes?.url}
                      altText="Social Media"
                    />
                  </Link>
                ) : (
                  renderLogo("object-cover min-w-[40px] max-w-[40px]")
                )
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
