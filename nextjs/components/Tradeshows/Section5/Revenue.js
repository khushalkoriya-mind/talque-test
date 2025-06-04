import { useState } from "react";
import {
  filterHandler,
  isLastIndex,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const ExhibitorsRevenue = ({ data }) => {
  const [selectedLink, setSelectedLink] = useState({ id: 1, imageUrl: "" });
  return (
    <section className="2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 pt-24 tradeshow_for_exhibitors_revenue_bg">
      <div className="w-full md:flex flex-col items-start mb-12">
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} md:mb-10 mb-5 lg:w-[55%] w-full`}>
          {data?.exhibitor_revenue_title}
        </div>
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
          {data?.exhibitor_revenue_description}
        </div>
      </div>
      <div className="lg:grid hidden xl:grid-cols-2 grid-cols-1 2xl:gap-28 xl:gap-12 lg:gap-10 pb-32 items-center">
        <div className="col-span-1 rounded-xl border-8 border-white bg-gradient-to-r from-purple-200 to-indigo-200">
          <LazyLoadImage
            className="max-w-[600px] max-h-[400px]"
            src={
              selectedLink?.imageUrl
                ? selectedLink?.imageUrl
                : data?.exhibitor_revenue?.length > 0
                ? data?.exhibitor_revenue[0]?.image?.data?.attributes?.url
                : ""
            }
            altText="Tradeshows Revenue"
          />
        </div>
        <div className="col-span-1">
          {data?.exhibitor_revenue?.length > 0 && (
            <div>
              {filterHandler(data?.exhibitor_revenue)?.map((item, index) => (
                <div
                  className={`cursor-pointer ${
                    !isLastIndex(data?.exhibitor_revenue, index) &&
                    "2xl:mb-14 xl:mb-10 lg:mb-8"
                  } flex 2xl:gap-7 xl:gap-5 lg:gap-3 items-center`}
                  key={index}
                  onClick={() =>
                    setSelectedLink({
                      id: item?.id,
                      imageUrl: item?.image?.data?.attributes?.url,
                    })
                  }>
                  <div
                    className={`min-w-[25px] min-h-[25px] rounded-full ${
                      selectedLink?.id === item?.id
                        ? "tradeshow_exhibitor_revenue_bg"
                        : "border-2 border-purple-300"
                    }
                  }`}
                  />
                  <div
                    className={`2xl:text-2xl xl:text-xl lg:text-lg text-talque-primary-color ${
                      selectedLink?.id === item?.id ? "font-semibold" : ""
                    }`}>
                    {item?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {data?.exhibitor_revenue?.length > 0 && (
        <div className="lg:hidden flex gap-5 overflow-auto no-scrollbar mb-10">
          {filterHandler(data?.exhibitor_revenue)?.map((item, index) => (
            <div key={index} className="flex flex-col">
              {item?.image?.data?.attributes?.url ? (
                <LazyLoadImage
                  className="bg-gradient-to-r from-purple-200 to-indigo-200 min-w-[280px] min-h-[170px] w-[280px] h-[170px] mb-5 border-2 border-white rounded-xl"
                  src={item?.image?.data?.attributes?.url}
                  altText="Tradeshows Revenue"
                />
              ) : (
                renderLogo(
                  "bg-gradient-to-r from-purple-200 to-indigo-200 min-w-[280px] min-h-[170px] w-[280px] h-[170px] mb-5 border-2 border-white rounded-xl"
                )
              )}
              <div className="text-base font-medium">{item?.title}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExhibitorsRevenue;
