import { filterHandler, classes, LazyLoadImage } from "@/utils/helper";

const Section3 = ({ data }) => {
  return (
    <div className="all-features-oursupport-bg 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:pt-18 pt-12 pb-14">
      <div
        className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:mb-10 mb-5`}>
        {data?.support_title}
      </div>
      <div
        className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} xl:w-1/2 w-full`}>
        {data?.support_description}
      </div>
      {data?.support_lists?.length > 0 && (
        <div className="lg:mt-10 mt-5 grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
          {filterHandler(data?.support_lists)?.map((item, index) => (
            <div
              key={index}
              className="col-span-1 bg-white px-6 py-5 rounded-xl flex flex-col items-start justify-start gap-2 text-black lg:border border-[#3333331A]">
              <div className="svgImage">
                <LazyLoadImage
                  src={item?.icon?.data?.attributes?.url}
                  className="lg:min-w-[50px] lg:max-w-[50px] min-w-[38px] max-w-[38px] border rounded-full lg:p-2.5 p-1.5 bg-white shadow-sm border-[#0000001A] mb-4"
                  altText="Arrow Icon"
                />
              </div>
              <div
                className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} break-words mb-4`}>
                {item?.title}
              </div>
              <div
                className={`${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} break-words text-talque-secondary-color`}>
                {item?.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Section3;
