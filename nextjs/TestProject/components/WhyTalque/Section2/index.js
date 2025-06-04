import { MarkdownRenderer, classes } from "@/utils/helper";

const Section2 = ({ data }) => {
  return (
    <section className="bg-[#F5F5F5] 2xl:pt-20 xl:pt-20 lg:pt-20 pt-10 pb-16">
      <div
        className={`capitalize ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:pl-[8%] pl-5 2xl:w-[45%] xl:w-[55%] lg:w-[65%] w-full lg:mb-12 mb-6`}>
        {data?.title_2}
      </div>
      {data?.description_2 && (
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} lg:pl-[20%] pl-5 lg:pr-32 pr-5`}>
          <MarkdownRenderer content={data?.description_2} />
        </div>
      )}
    </section>
  );
};

export default Section2;
