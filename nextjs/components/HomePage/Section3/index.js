import HotSpotCircle from "@/components/Common/HotSpotCircle";
import { classes } from "@/utils/helper";

const Section3 = ({ data, hotSpot }) => {
  return (
    <section className="bg-white lg:pt-32 pt-12">
      <div className="flex flex-col justify-center items-center 2xl:px-60 xl:px-14 lg:px-6 px-5">
        <div
          className={`xl:w-[70%] lg:w-4/5 w-full lg:text-center text-start text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} capitalize lg:mb-10 mb-5`}>
          {data?.title}
        </div>
        <div
          className={`text-talque-secondary-color lg:text-center text-start ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} xl:w-[70%] lg:w-4/5 w-full`}>
          {data?.subtitle}
        </div>
      </div>
      {hotSpot?.length > 0 && (
        <HotSpotCircle hotSpot={hotSpot} className="pb-36" />
      )}
    </section>
  );
};

export default Section3;
