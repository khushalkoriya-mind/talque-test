import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import Pagination from "@/components/Common/Pagination";
import { LanguageContext } from "@/context/LanguageContext";
import { Api } from "@/api";
import {
  LazyLoadImage,
  classes,
  dateTimeFormat,
  filterHandler,
  renderLogo,
} from "@/utils/helper";

const ReleaseNoteListUI = ({ data }) => {
  const refToScroll = useRef();
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCounts, setTotalCounts] = useState(5);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    getReleaseNotes(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const getReleaseNotes = async (page) => {
    if (page) {
      setPageNumber(page);
    }
    const response = await Api.getReleaseNotesList(
      locale,
      page ? page : pageNumber,
      6
    );
    if (response?.status === 200) {
      setList(response?.data?.data || []);
      setTotalCounts(response?.data?.meta?.pagination?.total || 0);
      setLoader(false);
    } else {
      setLoader(false);
      setList([]);
      setTotalCounts(0);
    }
  };

  const getTagClass = (element) =>
    element === "Blue"
      ? "bg-[#227BEF]"
      : element === "Green"
      ? "bg-[#36A4AE]"
      : element === "Pink"
      ? "bg-[#D17FE7]"
      : "";

  const getFeatureTags = (flags) => {
    return (
      <div className="flex gap-6 flex-wrap overflow-hidden box-border">
        {filterHandler(flags)?.map((element, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className={`${getTagClass(
                element?.attributes?.theme_color
              )} rounded-full w-[15px] h-[15px]`}
            />
            <span className="whitespace-nowrap lg:text-base text-xs">
              {element?.attributes?.title}
            </span>
          </div>
        ))}
      </div>
    );
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
      <section className="blog_section1_bg px-5 xl:py-28 lg:py-20 py-10 bg-white">
        <div className="flex flex-col justify-center items-center w-full">
          <div
            className={`lg:mb-10 mb-5 lg:text-center text-start xl:w-1/2 lg:w-[70%] w-full ${"xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold"}`}>
            {data?.title}
          </div>
          <div
            className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} lg:text-center text-start xl:w-1/2 lg:w-[70%] w-full`}>
            {data?.description}
          </div>
        </div>
      </section>
      <section ref={refToScroll} className="release-note-list-ui-bg">
        <div className="2xl:px-60 xl:px-36 lg:px-28">
          <div className="py-10">
            {loader ? (
              <Loader />
            ) : (
              <>
                {list?.length > 0 ? (
                  <>
                    <div className="border-[#33333333] mb-10" />
                    {filterHandler(list)?.map((item, index) => (
                      <div key={index}>
                        <div className="flex lg:flex-row flex-col items-start w-full lg:gap-10 gap-5 mb-10 lg:px-0 md:px-20 px-5">
                          <div
                            className={`${
                              item?.attributes?.image?.data?.attributes?.url
                                ? "lg:w-[50%] w-full"
                                : "w-full"
                            } flex flex-col lg:gap-4 gap-2`}>
                            {item?.attributes?.date && (
                              <div className="lg:text-base text-sm bg-white rounded-full text-center max-w-max px-4 py-2">
                                {dateTimeFormat(item?.attributes?.date)}
                              </div>
                            )}

                            {item?.attributes?.release_note_tags?.data?.length >
                              0 && (
                              <div className="mb-6">
                                {getFeatureTags(
                                  item?.attributes?.release_note_tags?.data
                                )}
                              </div>
                            )}
                            <div className="font-semibold lg:text-3xl text-xl">
                              {item?.attributes?.title}
                            </div>
                            <div className="text-talque-secondary-color lg:text-lg text-base">
                              {item?.attributes?.description}
                            </div>
                            <div>
                              <Link
                                href={"releasenotes-details/" + item?.id}
                                className="text-[#1877F2] lg:text-xl text-base underline">
                                Learn more
                              </Link>
                            </div>
                          </div>
                          {item?.attributes?.image?.data?.attributes?.url ? (
                            <div className="lg:w-[50%] w-full rounded-3xl">
                              <LazyLoadImage
                                className="w-[690px] h-[430px] border-gradient"
                                src={
                                  item?.attributes?.image?.data?.attributes?.url
                                }
                                altText="Release Notes"
                              />
                            </div>
                          ) : (
                            renderLogo("w-[690px] h-[430px] border-gradient")
                          )}
                        </div>
                        <div className="border-t border-[#33333333] mb-10" />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 h-[20vh] lg:text-xl text-lg font-medium">
                    No release notes found
                  </div>
                )}
              </>
            )}
            {list?.length > 0 && !loader && (
              <div className="mt-16 flex items-center justify-center">
                <Pagination
                  currentPage={pageNumber}
                  totalCount={totalCounts}
                  pageSize={5}
                  onPageChange={(page) => {
                    getReleaseNotes(page);
                    scrollToRef();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ReleaseNoteListUI;
