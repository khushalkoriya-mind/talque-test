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

const ReleaseNoteList = () => {
  const refToScroll = useRef();
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCounts, setTotalCounts] = useState(5);
  const [loader, setLoader] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

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
      ? "bg-[#227BEF26] text-talque-blue-color border-[#227BEF]"
      : element === "Green"
      ? "bg-[#36A4AE26] text-[#36A4AE] border-[#36A4AE]"
      : element === "Pink"
      ? "bg-[#D17FE726] text-[#D17FE7] border-[#D17FE7]"
      : "";

  const getFeatureTags = (flags) => {
    return (
      <div className="flex gap-6 flex-wrap overflow-hidden box-border">
        {filterHandler(flags)?.map((element, index) => (
          <p
            key={index}
            className={`whitespace-nowrap lg:text-base text-xs p-2.5 border-l-2 ${getTagClass(
              element?.attributes?.theme_color
            )}`}>
            {element?.attributes?.title}
          </p>
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
    <section ref={refToScroll}>
      <div className="2xl:px-60 xl:px-36 lg:px-28 bg-white">
        <div className="py-10">
          {loader ? (
            <Loader />
          ) : (
            <>
              {list?.length > 0 ? (
                <>
                  <div className="border-t border-[#33333333] mb-10" />
                  {filterHandler(list)?.map((item, index) => (
                    <div key={index}>
                      <div className="flex lg:flex-row flex-col items-start w-full lg:gap-10 gap-5 mb-10 lg:px-0 md:px-20 px-5">
                        <div className="lg:w-[30%] w-full flex flex-col lg:gap-7 gap-5">
                          {item?.attributes?.date && (
                            <div className="lg:text-2xl text-base">
                              {dateTimeFormat(item?.attributes?.date)}
                            </div>
                          )}
                          <div className="lg:text-xl text-xs text-talque-secondary-color">
                            {item?.attributes?.version}
                          </div>
                          {item?.attributes?.release_note_tags?.data?.length >
                            0 && (
                            <div>
                              {getFeatureTags(
                                item?.attributes?.release_note_tags?.data
                              )}
                            </div>
                          )}
                        </div>
                        <div className="lg:w-[70%] w-full flex flex-col lg:gap-6 gap-5">
                          <div
                            className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"}`}>
                            {item?.attributes?.title}
                          </div>
                          <div
                            className={`text-talque-secondary-color ${"md:text-base text-sm md:!leading-6 !leading-5 font-normal"}`}>
                            {item?.attributes?.description}
                          </div>
                          {item?.attributes?.image?.data ? (
                            <LazyLoadImage
                              className="w-[340px] h-[100px] object-cover"
                              src={
                                item?.attributes?.image?.data?.attributes?.url
                              }
                              altText="Release Notes"
                            />
                          ) : (
                            renderLogo("w-[340px] h-[100px] object-cover")
                          )}
                          <Link
                            onClick={() => setSelectedNote(item?.id)}
                            className="bg-dark-blue hover:bg-dark-blue/80 text-white py-3.5 px-5 rounded-full max-w-max text-sm flex items-center"
                            href={"releasenotes-details/" + item?.id}>
                            {item?.attributes?.CTA_box?.label}{" "}
                            {selectedNote === item?.id && (
                              <div
                                class="ml-3 w-5 h-5 rounded-full animate-spin
                            border-2 border-solid border-white border-t-transparent"></div>
                            )}
                          </Link>
                        </div>
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
  );
};

export default ReleaseNoteList;
