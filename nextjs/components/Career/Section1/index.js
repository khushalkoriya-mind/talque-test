import { LazyLoadImage, classes } from "@/utils/helper";

const Section1 = ({ data, loadingSc }) => {
  return (
    <section className={`carrer_bg relative ${loadingSc && "h-screen"}`}>
      <div className="2xl:gap-12 xl:gap-8 lg:gap-6 md:gap-16 gap-3 flex flex-col items-start justify-center lg:py-[8%] md:py-[10%] pb-[40%] pt-[8%] px-[10%]">
        <div
          className={`capitalize ${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"} w-full z-0 break-words`}>
          {data?.career_title || ""}
        </div>
        <div
          className={`lg:w-[38%] md:w-1/2 w-full ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} font-normal text-talque-secondary-color`}>
          {data?.career_description || ""}
        </div>
      </div>

      {data?.teaser_image?.data?.attributes?.url && (
        <LazyLoadImage
          className="2xl:w-[35%] xl:w-2/5 lg:w-[45%] md:w-[46%] w-[85%] absolute 2xl:right-[13%] xl:right-[6%] lg:right-[4%] md:right-[3%] right-[7%] md:top-[43%] 2xl:top-[45%] xl:top-[52%] lg:top-[51%] top-[75%] z-20"
          src={data?.teaser_image?.data?.attributes?.url}
          altText="Talque"
        />
      )}
    </section>
  );
};

export default Section1;
