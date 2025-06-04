import { useState } from "react";
import PlayIcon from "@/public/images/homepagecolorplayicon.svg";
import Modal from "@/components/Common/Modal";
import { LazyLoadImage, classes } from "@/utils/helper";
import Image from "next/image";

const Section7 = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="homepage_all_parts_together_bg py-20">
      <div className="flex flex-col justify-center items-center text-white text-center">
        <div
          className={`mb-14 capitalize ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} 2xl:w-1/2 xl:w-3/5 lg:w-[70%] w-full`}>
          {data?.all_parts_together_title}
        </div>
        {data?.all_parts_together_link && (
          <div className="text-sm flex items-center">
            <Image
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="min-w-[54px] max-w-[54px] mr-4 transition-all duration-300 hover:scale-105 cursor-pointer"
              src={PlayIcon}
              alt="Play Icon"
              height={1000}
              width={1000}
            />
            {data?.all_parts_together_link}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          url={data?.teaser_video?.data?.attributes?.url}
        />
      )}
    </div>
  );
};

export default Section7;
