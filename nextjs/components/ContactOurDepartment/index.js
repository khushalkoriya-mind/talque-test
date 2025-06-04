import React, { useContext, useEffect, useState } from "react";
import PhoneIcon from "@/public/images/contactus-phone.svg";
import EmailIcon from "@/public/images/contactus-email.svg";
import LocationIcon from "@/public/images/contactus-location.svg";
import { Api } from "@/api";
import { LanguageContext } from "@/context/LanguageContext";
import Image from "next/image";

const staticArray = [
  {
    id: 1,
    label: "Address",
    Address: "Choriner Strasse 310119 Berlin",
    picture: LocationIcon,
  },
  {
    id: 1,
    label: "Telephone",
    Address: "sales: +49 30 12088 52-250",
    picture: PhoneIcon,
  },
  { id: 1, label: "Email", Address: "sales@talque.de", picture: EmailIcon },
];

const ContactOurDepartment = () => {
  const { languageData } = useContext(LanguageContext);
  const [data, setData] = useState({});

  useEffect(() => {
    getExperienceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <section className="2xl:px-60 xl:px-36 lg:px-28 md:px-20 px-5 lg:pt-28 pt-10 lg:pb-72 pb-10 tradeshow_contact_our_department_bg relative">
      <div className="w-full flex flex-col items-center">
        <div className="capitalize text-talque-primary-color 2xl:text-5xl xl:text-c43 lg:text-c40 md:text-4xl text-2xl font-semibold md:mb-10 mb-5">
          Contact our sales experts
        </div>
      </div>

      <div className="2xl:bg-white xl:bg-white lg:bg-white bg-transparent lg:flex items-center justify-center rounded-xl gap-6">
        {staticArray?.map((item, index) => (
          <div
            key={index}
            className="lg:bg-transparent bg-white flex items-center 2xl:gap-8 xl:gap-6 lg:gap-4 gap-4 2xl:p-10 xl:p-6 lg:p-4 p-6 lg:border-none border rounded-xl lg:mb-0 mb-5">
            <Image
              className="xl:w-[80px] lg:w-[45px] w-[50px]"
              src={item?.picture}
              alt="Contact Us"
              height={1000}
              width={1000}
            />
            <div className="flex flex-col items-start xl:gap-5 gap-2">
              <div className="text-talque-primary-color 2xl:text-2xl xl:text-[22px] lg:text-[15px] text-sm font-semibold">
                {item?.label}
              </div>
              <div className="font-medium text-talque-secondary-color 2xl:text-xl xl:text-lg lg:text-[13px] text-base">
                {item?.Address}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="absolute xl:-bottom-12 lg:-bottom-7 z-20 2xl:block xl:block hidden">
          <div className="rounded-xl you_want_more_experience_bg text-white 2xl:px-60 xl:px-28 lg:px-8 2xl:py-12 xl:py-8 py-8 flex flex-col items-start justify-center w-full">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-4xl capitalize text-center text-white mb-[40px] w-full">
                {data?.title}
              </div>
              {!data?.button?.is_optional && (
                <div className="whitespace-nowrap transition-all duration-300 hover:scale-105 text-white border border-[#fff] rounded-full xl:py-5 lg:py-4 md:py-3 py-3 px-10 text-base font-medium w-auto cursor-pointer hover:bg-white hover:text-black">
                  {data?.button?.label}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactOurDepartment;
