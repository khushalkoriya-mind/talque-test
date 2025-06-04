import { classes } from "@/utils/helper";

const Section1 = ({ data }) => {
  return (
    <section>
      <div className="blog_section1_bg px-5 xl:py-28 lg:py-20 py-10 bg-white">
        <div className="flex flex-col justify-center items-center w-full">
          <div
            className={`${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"} lg:mb-10 mb-5 lg:text-center text-start xl:w-1/2 lg:w-[70%] w-full`}>
            {data?.blog_title}
          </div>
          <div
            className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} lg:text-center text-start xl:w-1/2 lg:w-[70%] w-full`}>
            {data?.blog_description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
