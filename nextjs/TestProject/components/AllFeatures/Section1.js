import { classes } from "@/utils/helper";

const Section1 = ({ data }) => {
  return (
    <section>
      <div className="blog_section1_bg px-5 xl:py-36 lg:py-20 py-10 bg-white">
        <div className="flex flex-col justify-center items-center w-full text-black capitalize">
          <div
            className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:mb-14 mb-5 lg:text-center text-start`}>
            {data?.main_title}
          </div>
          <div className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] lg:text-center font-bold text-center">
            {data?.main_description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
