import { classes } from "@/utils/helper";
import PositionsList from "./PositionsList";

const Section3 = ({ data, OpenPositionsList }) => {
  return (
    <section className="open_positions_bg">
      <div className="pt-[17%] md:pb-24 pb-6 2xl:px-48 xl:px-36 lg:px-32 md:px-24 px-7">
        <div
          className={`text-black capitalize whitespace-nowrap ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} mb-5`}>
          {data?.positions_title}
        </div>
        <div
          className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} text-talque-secondary-color font-normal overflow-hidden 2xl:w-[62%] xl:w-3/5 lg:w-full md:w-[85%]`}>
          {data?.positions_description}
        </div>
        {OpenPositionsList?.length > 0 && (
          <div className="mt-10">
            <PositionsList OpenPositionsList={OpenPositionsList} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Section3;
