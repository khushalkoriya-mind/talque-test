import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const ItsAllAboutDetails = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center tradeshow_why_talque_about_bg bg-white px-5">
      <div
        className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} text-talque-primary-color lg:pt-20 md:pt-16 pt-12 lg:px-60 text-center md:pb-16 pb-14`}>
        {data?.why_talque_about_details_title}
      </div>
      {data?.why_talque_all_about_details?.length > 0 && (
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center lg:gap-16 gap-7 pb-20">
          {filterHandler(data?.why_talque_all_about_details)?.map(
            (item, index) => (
              <div
                key={index}
                className="border border-[#66666633] col-span-1 shadow-2xl rounded-2xl md:w-[350px] w-full md:min-h-[500px] min-h-auto bg-white overflow-hidden pb-6">
                <div className="bg-off-white pt-8 px-8 h-[40%]">
                  {item?.image?.data?.attributes?.url ? (
                    <LazyLoadImage
                      className="w-[370px] h-full rounded-none overflow-hidden"
                      src={item?.image?.data?.attributes?.url}
                      altText="Tradeshows"
                    />
                  ) : (
                    renderLogo("w-[370px] h-full rounded-none overflow-hidden")
                  )}
                </div>
                <div className="px-[20px] bg-white h-[60%] mt-7">
                  <div
                    className={`text-talque-primary-color ${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} mb-7`}>
                    {item?.title}
                  </div>
                  {item?.secondtitle && (
                    <div className="text-talque-primary-color md:text-lg text-base font-medium mb-5">
                      {item?.secondtitle}
                    </div>
                  )}
                  <div
                    className={`text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
                    {item?.description}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ItsAllAboutDetails;
