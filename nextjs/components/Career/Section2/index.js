import { classes } from "@/utils/helper";
import ThreeBoxes from "./ThreeBoxes";

const Section2 = ({ data }) => {
  return (
    <section className="what_we_offer_bg relative">
      <div
        className={`2xl:px-48 xl:px-36 lg:px-32 md:px-24 px-7 ${
          data?.teaser_image?.data?.attributes?.url && "md:pt-[15%] pt-[40%]"
        } ${data?.three_boxes?.length > 0 ? "pb-[10%]" : "pb-[2%]"}`}>
        <div
          className={`capitalize text-white ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} mb-6`}>
          {data?.what_we_offer_title}
        </div>
        <div
          className={`font-normal z-0 text-white max-w-full ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} `}>
          {data?.what_we_offer_description}
        </div>
      </div>
      {data?.three_boxes?.length > 0 && (
        <div>
          <ThreeBoxes CareerPageData={data} />
        </div>
      )}
    </section>
  );
};

export default Section2;
