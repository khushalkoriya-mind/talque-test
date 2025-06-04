import { classes } from "@/utils/helper";
import Carousel from "./Carousel";

const Section4 = ({ data }) => {
  return (
    <section className="bg-[#F5F5F5]">
      <div className="lg:text-center 2xl:py-20 xl:py-16 lg:py-16 py-8 flex flex-col gap-3 lg:items-center lg:px-0 px-5">
        <div className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
          {data?.life_at_talque_title}
        </div>
        <div
          className={`font-normal text-talque-secondary-color 2xl:w-1/2 xl:w-2/5 lg:w-[70%] md:w-[85%] ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
          {data?.life_at_talque_description}
        </div>
      </div>
      {data?.life_at_talque_images?.length > 0 && (
        <Carousel CareerPageData={data} />
      )}
    </section>
  );
};

export default Section4;
