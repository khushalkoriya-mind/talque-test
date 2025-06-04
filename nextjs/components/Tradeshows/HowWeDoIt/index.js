import Link from "next/link";
import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const HowWeDoIt = ({ data }) => {
  return (
    <section className="pt-24 bg-white">
      <div className="w-full flex flex-col items-start mb-12 2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5">
        <div
          className={`capitalize text-talque-primary-color md:mb-10 mb-5 lg:w-[55%] w-full ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
          {data?.how_we_do_it_title}
        </div>
        <div className="flex justify-between items-center w-full">
          <div
            className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"}`}>
            {data?.how_we_do_it_small_title}
          </div>

          <Link
            href="/blogs"
            className="lg:block hidden text-talque-primary-color border border-black px-10 py-6 md:py-3 text-xl rounded-full hover:bg-dark-blue hover:text-white hover:border-transparent">
            {data?.how_we_do_it_rightbutton?.label}
          </Link>
        </div>
      </div>
      {data?.how_we_do_it_data?.length > 0 && (
        <div className="flex overflow-auto no-scrollbar items-center 2xl:justify-center justify-start lg:gap-16 gap-5 lg:pb-20 pb-12 2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5">
          {filterHandler(data?.how_we_do_it_data)?.map((item, index) => (
            <div
              key={index}
              className="border border-[#66666633] shadow-2xl rounded-2xl min-w-[340px] min-h-[500px] w-[400px] h-[500px] bg-white overflow-hidden">
              <div className="bg-off-white">
                {item?.image?.data?.attributes?.url ? (
                  <LazyLoadImage
                    src={item?.image?.data?.attributes?.url}
                    altText="Tradeshows Background"
                  />
                ) : (
                  renderLogo("")
                )}
              </div>
              <div className="px-5 bg-white h-[50%] pt-7">
                <div
                  className={`text-talque-primary-color ${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} mb-7`}>
                  {item?.title}
                </div>
                <div
                  className={`text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
                  {item?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="lg:hidden flex items-center justify-center pb-10">
        <button className="transition-all duration-300 hover:scale-105 text-talque-primary-color border border-black px-5 py-3 text-sm rounded-full hover:bg-dark-blue hover:text-white hover:border-transparent">
          {data?.how_we_do_it_rightbutton?.label}
        </button>
      </div>
    </section>
  );
};

export default HowWeDoIt;
