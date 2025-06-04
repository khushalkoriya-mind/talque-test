import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Api } from "@/api";
import Loader from "@/components/Loader";
import {
  LazyLoadImage,
  MarkdownRenderer,
  SeoComponent,
  classes,
  dateTimeFormat,
  renderLogo,
} from "@/utils/helper";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import { LanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router";
import { sliderGlobalConfig } from "@/utils/constant";

const ReleaseNoteDetailPage = () => {
  const router = useRouter();
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [seo, setSeo] = useState({});
  const [releaseNoteDetails, setReleaseNoteDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const sliderConfig = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    ...sliderGlobalConfig,
  };

  useEffect(() => {
    if (router?.query?.slug) {
      setLoading(true);
      getReleaseNoteDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, router?.query?.slug]);

  const getReleaseNoteDetails = async () => {
    const slug = router?.query?.slug;
    const response = await Api.getReleaseNoteById(locale, slug);
    if (response?.status === 200) {
      setReleaseNoteDetails(response?.data?.data?.attributes);
      setLoading(false);
    } else {
      setReleaseNoteDetails({});
      setLoading(false);
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
        {flags?.map((element, index) => (
          <p
            key={index}
            className={`whitespace-nowrap lg:text-base text-base px-2 py-1.5 border-l-2 ${getTagClass(
              element?.attributes?.theme_color
            )}`}>
            {element?.attributes?.title}
          </p>
        ))}
      </div>
    );
  };

  const renderSlider = () => {
    return (
      <Slider {...sliderConfig}>
        {releaseNoteDetails?.media_images?.data?.map((item, index) =>
          item?.attributes?.url ? (
            <LazyLoadImage
              key={index}
              className="h-[318px] w-[588px] object-cover mb-3"
              src={item?.attributes?.url}
              altText="Talque"
            />
          ) : (
            renderLogo("h-[318px] w-[588px] object-cover mb-3")
          )
        )}
      </Slider>
    );
  };

  return (
    <>
      <SeoComponent title="Talque | Release Note Details" seo={seo} />
      {loading ? (
        <div className="!bg-white h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {releaseNoteDetails?.title ? (
            <section className="2xl:px-60 xl:px-14 lg:px-6 px-5 bg-white lg:py-20 py-10">
              <div className="flex lg:flex-row flex-col items-start w-full gap-20">
                <div
                  className={`${
                    releaseNoteDetails?.media_images?.data?.length > 0
                      ? "lg:w-[60%] w-full"
                      : "w-full"
                  }`}>
                  {releaseNoteDetails?.date && (
                    <div className="lg:text-2xl text-base mb-5">
                      {dateTimeFormat(releaseNoteDetails?.date)}
                    </div>
                  )}
                  <div
                    className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} mb-5`}>
                    {releaseNoteDetails?.title}
                  </div>
                  <div className="lg:text-base text-xl text-talque-secondary-color flex md:flex-row flex-col md:gap-7 gap-4 md:items-center items-start md:mb-10 mb-5">
                    <div>{releaseNoteDetails?.version}</div>
                    <div>
                      {getFeatureTags(
                        releaseNoteDetails?.release_note_tags?.data
                      )}
                    </div>
                  </div>
                  <div className="lg:text-2xl font-semibold mb-3">
                    {releaseNoteDetails?.sub_heading}
                  </div>
                  <div className="text-talque-secondary-color md:text-xl text-sm md:mb-10 mb-5">
                    {releaseNoteDetails?.description}
                  </div>
                  {releaseNoteDetails?.media_images?.data?.length > 0 && (
                    <div className="lg:w-[40%] w-full my-10 lg:hidden block releasenote-slider-dot">
                      {renderSlider()}
                    </div>
                  )}
                  {releaseNoteDetails?.detailed_description?.length > 0 && (
                    <div>
                      {releaseNoteDetails?.detailed_description?.map(
                        (item, index) => (
                          <div className="my-5" key={index}>
                            <div className="text-2xl font-semibold mb-5">
                              {item?.title}
                            </div>
                            {item?.description && (
                              <div className="text-talque-secondary-color text-base">
                                <MarkdownRenderer content={item?.description} />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                {releaseNoteDetails?.media_images?.data?.length > 0 && (
                  <div className="lg:w-[40%] w-full mt-16 lg:block hidden releasenote-slider-dot">
                    {renderSlider()}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <div className="flex items-center justify-center gap-2 h-[45vh] lg:text-xl text-lg font-medium bg-white">
              No details found
            </div>
          )}
          <YouWantMoreExperience />
        </>
      )}
    </>
  );
};

export default ReleaseNoteDetailPage;
