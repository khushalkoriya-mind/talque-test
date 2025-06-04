import React, { useRef, useState } from "react";
import BlogListing from "./blogListing";
import { filterHandler } from "@/utils/helper";
import { defaultBlogFilter } from "@/utils/constant";

const Section2 = ({ blogTags }) => {
  const refToScroll = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(defaultBlogFilter);
  return (
    <section className="py-10 bg-white">
      {blogTags?.length > 0 && (
        <div
          ref={refToScroll}
          className="flex items-center gap-4 sticky xl:top-20 top-16 bottom-0 bg-white p-6 2xl:px-60 xl:px-14 lg:px-6 px-5 overflow-auto no-scrollbar">
          {filterHandler([defaultBlogFilter, ...blogTags])?.map(
            (item, index) => (
              <div
                onClick={() => {
                  if (selectedFilter?.id !== item?.id) {
                    setSelectedFilter({
                      id: item?.id,
                      label: item?.attributes?.title,
                    });
                  }
                }}
                key={index}
                className={`border whitespace-nowrap rounded-full py-2.5 px-7 hover:bg-dark-blue hover:text-white ${
                  selectedFilter?.id === item?.id
                    ? "bg-dark-blue text-white border-transparent"
                    : "text-talque-secondary-color cursor-pointer"
                }`}>
                {item?.attributes?.title}
              </div>
            )
          )}
        </div>
      )}
      <BlogListing selectedFilter={selectedFilter} refToScroll={refToScroll} />
    </section>
  );
};

export default Section2;
