import { useState } from "react";
import { filterHandler, classes } from "@/utils/helper";

const OrganiserJourney = ({ data }) => {
  const [selectedJourney, setSelectedJourney] = useState(1);
  return (
    <div className="2xl:px-60 xl:px-36 lg:px-6 md:px-10 px-5">
      <div
        className={`md:mb-20 mb-5 ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} text-talque-primary-color lg:text-center text-start`}>
        {data?.organiser_journey_title}
      </div>
      {data?.organiser_jouney?.length > 0 && (
        <div className="flex overflow-auto no-scrollbar items-center xl:justify-center lg:gap-0 gap-5 lg:pb-20 pb-12">
          {filterHandler(data?.organiser_jouney)?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl items-start lg:min-w-auto min-w-[280px] lg:bg-transparent bg-white lg:p-0 p-5">
              <div className="flex items-center mb-10">
                <div
                  className={`p-8 flex justify-center items-center w-[80px] h-[80px] lg:border-2 border-dotted rounded-full border-[#D17FE7] ${
                    selectedJourney === item?.id
                      ? "lg:bg-purple-50"
                      : "bg-purple-50"
                  }`}
                  onClick={() => setSelectedJourney(item?.id)}>
                  <div
                    className={`${
                      selectedJourney === item?.id
                        ? "bg-gradient-to-r from-[#D17FE7] to-[#798DDE] text-white"
                        : "border bg-white"
                    } rounded-full p-8 w-[64px] h-[64px] flex items-center justify-center text-3xl font-bold`}>
                    {item?.id}
                  </div>
                </div>
                {data?.organiser_jouney?.length - 1 !== index && (
                  <div className="border-dashed border w-full lg:block hidden" />
                )}
              </div>
              <div
                className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} text-talque-primary-color capitalize lg:mb-6 mb-4`}>
                {item?.title}
              </div>
              <div
                className={`${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} text-talque-secondary-color pr-10`}>
                {item?.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganiserJourney;
