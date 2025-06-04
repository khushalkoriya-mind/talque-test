import { classes } from "@/utils/helper";

const Section1 = ({ data }) => {
  return (
    <section>
      <div className="2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 bg-white lg:pt-20 pt-10">
        <div className="flex flex-col lg:gap-10 gap-5 xl:w-[70%] w-full">
          <div className="xl:text-5xl lg:text-[36px] text-2xl lg:font-semibold font-bold capitalize">
            {data?.title}
          </div>
          <div
            className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} text-talque-secondary-color`}>
            {data?.description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
