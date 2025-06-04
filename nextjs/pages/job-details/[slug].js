import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/api";
import EmailImage from "@/public/images/jobdetailsemail.svg";
import {
  MarkdownRenderer,
  SeoComponent,
  errorToast,
  renderLogo,
  successToast,
  classes,
  LazyLoadImage,
} from "@/utils/helper";
import validator from "validator";
import Loader from "@/components/Loader";
import { LanguageContext } from "@/context/LanguageContext";
import Image from "next/image";

const JobDetailsPage = () => {
  const router = useRouter();
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [jobDetail, setJobDetails] = useState({});
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    if (router?.query?.slug) {
      getJobDetailsByID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, router?.query?.slug]);

  const getJobDetailsByID = async () => {
    setLoading(true);
    const slug = router?.query?.slug;
    const JobsResponse = await Api.getPositionsListById(locale, slug);
    if (JobsResponse?.status === 200) {
      setJobDetails(JobsResponse?.data?.data?.attributes);
      setLoading(false);
    } else {
      setJobDetails({});
      setLoading(false);
    }
  };

  const handleLatestEmailUpdate = async () => {
    if (validator.isEmpty(email.trim())) {
      setError("Please enter email address.");
    } else if (!validator.isEmail(email)) {
      setError("Please enter valid email address.");
    } else {
      const payload = {
        data: { email: email },
      };
      const response = await Api.addLatestUpdateMail(payload);
      if (response?.status === 200) {
        successToast("You are subscribed to this email successfully");
        setEmail("");
      } else {
        errorToast(
          response?.error?.details?.errors[0]?.message ||
            "Something went wrong!"
        );
      }
    }
  };

  return (
    <>
      <SeoComponent title="Talque | Job Details" seo={seo} />
      {loading ? (
        <div className="!bg-white h-[calc(100vh-350px)]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-white 2xl:px-60 xl:px-14 lg:px-5 px-5 2xl:py-24 xl:py-24 lg:py-24 py-11 job_details_bg">
            <section>
              <div
                className={`2xl:grid xl:grid lg:grid ${
                  jobDetail?.teaser_image?.data?.attributes?.url
                    ? "2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2"
                    : "grid-cols-1"
                } items-center 2xl:gap-24 xl:gap-24 lg:gap-14`}>
                <div className="flex flex-col 2xl:gap-y-10 xl:gap-y-10 gap-y-10 col-span-1 2xl:mb-0 xl:mb-0 lg:mb-0 mb-10">
                  <div
                    className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"}`}>
                    {jobDetail?.job_title}
                  </div>
                  <div
                    className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} font-normal`}>
                    {jobDetail?.job_description}
                  </div>
                  <div className="2xl:flex xl:flex lg:flex md:flex block items-center gap-[60px] text-base font-medium">
                    <div className="2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 mb-3 border border-[#3333331a] bg-[#F5F5F5] px-[20px] py-[10px] w-full rounded-md gap-[15px]">
                      <div className="text-talque-secondary-color 2xl:text-base xl:text-base lg:text-sm">
                        Location
                      </div>
                      <div>{jobDetail?.location}</div>
                    </div>
                    <div className="border border-[#3333331a] bg-[#F5F5F5] px-[20px] py-[10px] w-full rounded-md gap-[15px]">
                      <div className="text-talque-secondary-color 2xl:text-base xl:text-base lg:text-sm">
                        Field
                      </div>
                      <div>{jobDetail?.field}</div>
                    </div>
                  </div>
                </div>
                {jobDetail?.teaser_image?.data?.attributes?.url ? (
                  <LazyLoadImage
                    className="col-span-1 object-cover border-[10px] border-[#D17FE7] rounded-[40px] 2xl:h-full xl:h-full lg:h-full md:h-[350px] h-[350px]"
                    src={jobDetail?.teaser_image?.data?.attributes?.url}
                    altText="Job Details Teaser Icon"
                  />
                ) : (
                  renderLogo(
                    "col-span-1 object-cover border-[10px] border-[#D17FE7] rounded-[40px] 2xl:h-full xl:h-full lg:h-full md:h-[350px] h-[350px]"
                  )
                )}
              </div>
            </section>
            <div className="mt-16 mb-20 border" />
            <div className="flex flex-col relative">
              <div className="flex flex-col gap-y-5 mb-14">
                <div className="font-semibold text-2xl mb-[8px]">
                  {jobDetail?.second_title}
                </div>
                {jobDetail?.second_description && (
                  <div className="text-base text-talque-secondary-color">
                    <MarkdownRenderer content={jobDetail?.second_description} />
                  </div>
                )}
              </div>

              {jobDetail?.your_profile && (
                <div className="flex flex-col gap-y-5 border rounded-xl px-7 py-10 mb-14">
                  <MarkdownRenderer content={jobDetail?.your_profile} />
                </div>
              )}

              {jobDetail?.our_offer && (
                <div className="flex flex-col gap-y-5 border rounded-xl px-7 py-10 mb-14">
                  <MarkdownRenderer content={jobDetail?.our_offer} />
                </div>
              )}

              {jobDetail?.about_our_company && (
                <div className="flex flex-col gap-y-5 border rounded-xl px-7 py-10 2xl:mb-14 xl:mb-14 lg:mb-14 md:mb-14">
                  <MarkdownRenderer content={jobDetail?.about_our_company} />
                </div>
              )}
              <div className="2xl:mb-6 xl:mb-6 lg:mb-6 md:mb-28" />
            </div>
          </div>
          {/* mobile screen ui */}
          <section className="job_details_email_bg 2xl:hidden xl:hidden lg:hidden md:hidden flex flex-col">
            <div className="text-white px-8 py-10 flex flex-col items-start justify-center">
              <div className="text-base mb-10 font-semibold">
                {jobDetail?.box_header}
              </div>
              <div className="text-sm mb-[16px]">
                {jobDetail?.box_subheader}
              </div>
              <div className="text-xl whitespace-nowrap font-semibold">
                {jobDetail?.box_email}
              </div>
            </div>
          </section>

          <div className="relative">
            <section className="bg-[#227bef26] flex flex-col justify-center">
              <div className="2xl:px-60 xl:px-14 lg:px-5 px-5 2xl:pt-48 2xl:pb-20 xl:pt-48 xl:pb-20 lg:pt-48 lg:pb-20 md:pt-40 md:pb-20 pt-12 pb-10">
                <div className="2xl:mb-[50px] xl:mb-[50px] lg:mb-[50px] md:mb-[50px] mb-[30px] font-semibold 2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl text-xl text-talque-primary-color 2xl:text-center xl:text-center lg:text-center md:text-center">
                  Get the latest updates on your mail
                </div>
                <div className="2xl:flex xl:flex lg:flex md:flex items-start justify-center gap-[19px]">
                  <div className="2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 mb-4 flex flex-col">
                    <input
                      className="rounded-full px-7 py-3.5 2xl:w-[480px] xl:w-[480px] lg:w-[430px] md:w-[400px] w-full focus-within:outline-none placeholder:text-talque-secondary-color"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          handleLatestEmailUpdate();
                        }
                      }}
                    />
                    <div className="text-red-500">{error}</div>
                  </div>
                  <div>
                    <button
                      className="bg-gradient-to-r from-[#D17FE7] to-[#798DDE] rounded-full px-7 py-3.5 text-base text-white cursor-pointer transition duration-500 ease-in-out  
                       bg-green-300 hover:bg-green-600 transform  
                       hover:-translate-y-1 hover:scale-110"
                      onClick={() => handleLatestEmailUpdate()}>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="2xl:px-60 xl:px-14 lg:px-5 px-5 2xl:grid xl:grid lg:grid md:grid hidden grid-cols-2 absolute 2xl:-top-32 xl:-top-32 lg:-top-32 md:-top-40 -top-32">
                <div className="rounded-tl-xl rounded-bl-xl col-span-1 job_details_email_bg text-white px-10 py-5 flex flex-col items-start justify-center">
                  <div className="2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl text-sm 2xl:mb-10 xl:mb-10 lg:mb-10 md:mb-5 font-semibold">
                    {jobDetail?.box_header}
                  </div>
                  <div className="2xl:text-lg xl:text-lg lg:text-base md:text-base text-sm">
                    {jobDetail?.box_subheader}
                  </div>
                  <div className="2xl:text-4xl xl:text-4xl lg:text-3xl md:text-2xl whitespace-nowrap text-lg font-semibold">
                    {jobDetail?.box_email}
                  </div>
                </div>
                <div className="col-span-1">
                  <Image
                    className="object-cover rounded-tr-xl rounded-br-xl w-[720px] h-[260px]"
                    src={EmailImage}
                    alt="Job Details Teaser Image"
                    height={1000}
                    width={1000}
                  />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default JobDetailsPage;
