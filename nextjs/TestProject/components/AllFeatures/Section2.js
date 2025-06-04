import { filterHandler, classes, LazyLoadImage } from "@/utils/helper";
import ArrowImage from "@/public/images/features-arrow.svg";
import BlueArrowImage from "@/public/images/features-blue-arrow.svg";
import { useState } from "react";
import Modal from "../Common/Modal";
import Image from "next/image";

const Section2 = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  return (
    <div className="all-features-bg-bg 2xl:px-60 xl:px-14 lg:px-6 px-5 py-5">
      {data?.lists?.length > 0 &&
        filterHandler(data?.lists)?.map((item, index) => (
          <div key={index} className="lg:py-20 py-5">
            <div
              className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} lg:mb-10 mb-5`}>
              {item?.list_title}
            </div>
            <div
              className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} xl:w-1/2 w-full`}>
              {item?.list_description}
            </div>
            {item?.list_data?.length > 0 && (
              <div className="lg:mt-10 mt-5 grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
                {filterHandler(item?.list_data)?.map(
                  (innerItem, innerIndex) => (
                    <div
                      onMouseOver={() => setHoverIndex(innerIndex + item?.id)}
                      onMouseOut={() => setHoverIndex(null)}
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setSelectedContent(innerItem);
                      }}
                      key={innerIndex}
                      className="col-span-1 bg-white px-4 py-4 rounded-xl flex items-center justify-between gap-2 hover:text-talque-blue-color text-black border border-[#3333331A] hover:shadow-md cursor-pointer">
                      <div className="lg:text-2xl text-base lg:!leading-10 !leading-6 lg:font-semibold font-medium break-words">
                        {innerItem?.title}
                      </div>
                      <div className="svgImage">
                        <Image
                          src={
                            innerIndex + item?.id === hoverIndex
                              ? BlueArrowImage
                              : ArrowImage
                          }
                          className="lg:min-w-[24px] lg:max-w-[24px] min-w-[20px] max-w-[20px] object-cover"
                          alt="Arrow Icon"
                          height={1000}
                          width={1000}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      {isModalOpen && (
        <Modal
          forAllFeatures={true}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          data={selectedContent}
        />
      )}
    </div>
  );
};

export default Section2;
