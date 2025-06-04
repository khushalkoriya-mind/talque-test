import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Api } from "@/api";
import { LanguageContext } from "@/context/LanguageContext";
import { LazyLoadImage, filterHandler } from "@/utils/helper";

const Footer = () => {
  const { languageData } = useContext(LanguageContext);
  const [navigationsData, setNavigationsData] = useState([]);

  useEffect(() => {
    getFooterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageData?.shortText]);

  const getFooterData = async () => {
    const response = await Api.getFooterList(languageData?.shortText || "en");
    if (response?.status === 200) {
      setNavigationsData(response?.data?.data?.attributes);
    } else {
      setNavigationsData([]);
    }
  };

  return (
    <footer className="relative bg-white pt-[3%] pb-[1%] 2xl:px-[9%] xl:px-[9%] lg:px-[7%] md:px-[2%] px-[20px]">
      <div className="md:mb-[2%] mb-10 md:flex justify-between items-center border-gray-100">
        <div className="2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 mb-10">
          {navigationsData?.left_side_image?.data && (
            <Link href="/">
              <LazyLoadImage
                className="h-[50px] w-[127px] min-h-[50px] min-w-[127px] sm:h-10 object-cover"
                src={navigationsData?.left_side_image?.data?.attributes?.url}
                altText="Talque"
              />
            </Link>
          )}
        </div>

        {navigationsData?.footer_links?.length > 0 && (
          <div className="xl:my-4 my-3 grid xl:gap-x-[100px] lg:gap-6 md:gap-5 gap-7 md:grid-cols-3 grid-cols-2">
            {filterHandler(navigationsData?.footer_links)?.map(
              (item, index) => (
                <Link
                  key={index}
                  href={item?.url || "/"}
                  className="cursor-pointer lg:text-base xl:text-lg md:text-base text-base font-medium text-black hover:text-talque-blue-color whitespace-nowrap">
                  {item?.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
      <div className="md:flex justify-between items-center text-center border-t lg:text-[15px] xl:text-base md:text-sm text-base text-talque-secondary-color pt-[25px]">
        <div className="md:mb-0 mb-5">{navigationsData?.copy_right || ""}</div>
        {navigationsData?.socialmedia_links?.length > 0 && (
          <div className="flex items-center justify-center md:mb-0 mb-5">
            <div className="flex items-center gap-3 cursor-pointer md:mt-0 mt-3">
              {filterHandler(navigationsData?.socialmedia_links)?.map(
                (item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item?.url || "/"}
                      target={item?.target || "_blank"}>
                      <LazyLoadImage
                        className="w-6 h-6"
                        src={item?.socialmedia_image?.data?.attributes?.url}
                        altText={item?.label}
                      />
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
