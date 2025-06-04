import React, { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import { LanguageContext } from "@/context/LanguageContext";

const YouWantMoreExperience = () => {
  const { languageData } = useContext(LanguageContext);
  const [data, setData] = useState({});

  useEffect(() => {
    getExperienceData();
  }, []);

  const getExperienceData = async () => {
    const response = await Api.getYouWantMoreExperienceData(
      languageData?.shortText
    );
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData([]);
    }
  };

  if (data?.title)
    return (
      <section className="min-h-auto you_want_more_experience_bg 2xl:py-16 xl:py-16 lg:py-16 py-9 px-6 xl:px-24 lg:px-12">
        <div className="flex flex-col xl:gap-14 lg:gap-6 gap-4 items-center">
          <div className="font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl text-xl capitalize text-center text-white">
            {data?.title}
          </div>

          {!data?.button?.is_optional && (
            <div className="whitespace-nowrap transition-all duration-300 hover:scale-105 text-white border border-[#fff] rounded-full xl:py-5 lg:py-4 py-3 px-10 text-base font-medium w-auto cursor-pointer hover:bg-white hover:text-black">
              {data?.button?.label}
            </div>
          )}
        </div>
      </section>
    );
  else {
    return null;
  }
};

export default YouWantMoreExperience;
