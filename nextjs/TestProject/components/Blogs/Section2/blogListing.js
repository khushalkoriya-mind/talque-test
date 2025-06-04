import React, { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import Pagination from "@/components/Common/Pagination";
import { LanguageContext } from "@/context/LanguageContext";
import {
  LazyLoadImage,
  classes,
  dateTimeFormat,
  filterHandler,
  renderLogo,
} from "@/utils/helper";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const BlogType = (item) => item?.attributes?.blog_tag?.data?.attributes?.title;

const BlogListing = ({ selectedFilter, refToScroll, isDetailPage, slugID }) => {
  const router = useRouter();
  const { languageData } = useContext(LanguageContext);
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCounts, setTotalCounts] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    getBlogs(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const getBlogs = async (page) => {
    if (page) {
      setPageNumber(page);
    }
    const query = selectedFilter?.id
      ? `filters[blog_tag][title][$contains]=${selectedFilter?.label}`
      : undefined;
    const BlogListResponse = await Api.getBlogList(
      languageData?.shortText,
      page ? page : pageNumber,
      6,
      query
    );
    if (BlogListResponse?.status === 200) {
      const BlogList = BlogListResponse?.data;
      const filtered = BlogList?.data
        ?.filter((i) => i.id != slugID)
        .slice(0, 3);
      setList(slugID ? filtered || [] : BlogList?.data || []);
      setTotalCounts(BlogList?.meta?.pagination?.total || 0);
      setLoader(false);
    } else {
      setList([]);
      setTotalCounts(0);
    }
  };

  const scrollToRef = () => {
    if (refToScroll.current) {
      const targetPosition = refToScroll.current.getBoundingClientRect().top;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {list?.length > 0 ? (
            <div
              className={`${
                !isDetailPage && "2xl:px-60 xl:px-14 lg:px-6 px-5"
              } ${
                isDetailPage
                  ? "lg:grid flex lg:overflow-hidden overflow-auto no-scrollbar"
                  : "grid"
              } xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 lg:gap-20 my-4`}>
              {filterHandler(list)?.map((item, index) => {
                const { attributes, id } = item;
                return (
                  <div
                    key={index}
                    className={`col-span-1 max-h-max bg-white rounded-xl border shadow-md cursor-pointer hover:shadow-lg lg:mb-5 mb-5 ${
                      isDetailPage
                        ? "lg:w-full md:min-w-[400px] min-w-[340px] lg:mr-auto md:mr-10 mr-5"
                        : "w-full"
                    } `}
                    onClick={() => {
                      router.push(/blog-details/ + item?.id);
                    }}>
                    {attributes?.blog_image?.data?.attributes?.url ? (
                      <LazyLoadImage
                        className="w-full h-[220px] rounded-t-xl"
                        src={attributes?.blog_image?.data?.attributes?.url}
                        altText="Blog"
                      />
                    ) : (
                      renderLogo("w-full h-[220px] rounded-t-xl")
                    )}
                    <div className="h-[60%] px-5 pt-6 pb-10">
                      <div className="flex justify-between text-base mb-6">
                        <div className="text-talque-blue-color uppercase font-semibold">
                          {BlogType(item)}
                        </div>
                        {attributes?.blog_date && (
                          <div className="text-talque-secondary-color font-medium">
                            {dateTimeFormat(attributes?.blog_date)}
                          </div>
                        )}
                      </div>
                      <div
                        className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} capitalize mb-5`}>
                        {attributes?.blog_title}
                      </div>
                      <div
                        className={`${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"} text-talque-secondary-color multiline-ellipsis`}>
                        {attributes?.blog_text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 min-h-[40vh] text-xl font-medium">
              No blogs found
            </div>
          )}
        </>
      )}
      {list?.length > 0 && !isDetailPage && !loader && (
        <div className="mt-16 flex items-center justify-center">
          <Pagination
            currentPage={pageNumber}
            totalCount={totalCounts}
            pageSize={6}
            onPageChange={(page) => {
              getBlogs(page);
              scrollToRef();
            }}
          />
        </div>
      )}
    </>
  );
};

export default BlogListing;
