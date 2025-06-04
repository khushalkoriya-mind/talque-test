import Link from "next/link";
import { classes, filterHandler } from "@/utils/helper";

const PositionsList = ({ OpenPositionsList }) => {
  return (
    <div className="lg:grid grid-flow-row-dense grid-cols-2 gap-x-10 gap-y-14">
      {filterHandler(OpenPositionsList)?.map((item, index) => {
        const { attributes, id } = item;
        return (
          <div
            className="bg-white open_position_custom_shadow rounded-xl border-[#3333331a] border lg:mb-0 mb-[1.5rem]"
            key={index}>
            <div className="lg:p-7 p-5 flex flex-col gap-3">
              <div className="text-talque-blue-color md:text-base text-sm font-medium px-5 py-0.5 bg-[#227bef26] rounded-full max-w-max text-center inline-flex items-center">
                {attributes?.field}
              </div>
              <div className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} capitalize`}>
                {attributes?.job_title || ""}
              </div>
              <div
                className={`${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} text-talque-secondary-color mb-2`}>
                {attributes?.job_description || ""}
              </div>
              <div className="flex justify-between md:text-base text-sm">
                <div>
                  <div className="text-talque-secondary-color">Location</div>
                  <div>{attributes?.location || ""}</div>
                </div>
                <div>
                  <Link
                    className="whitespace-nowrap hover:bg-dark-blue hover:text-white border-[#222] text-talque-primary-color border hover:border-none rounded-full px-4 py-2 text-center cursor-pointer flex items-center"
                    href={/job-details/ + id}>
                    {attributes?.view_details_btn?.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PositionsList;
