import React, { useEffect, useRef, useState } from "react";
import Section1 from "@/components/Tradeshows/Section1";
import Section2 from "@/components/Tradeshows/Section2";
import Section3 from "@/components/Tradeshows/Section3";
import Section4 from "@/components/Tradeshows/Section4";
import Section5 from "@/components/Tradeshows/Section5";
import HowWeDoIt from "@/components/Tradeshows/HowWeDoIt";
import CustomerVoice from "@/components/Tradeshows/CustomerVoice";
import ContactOurDepartment from "@/components/ContactOurDepartment";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import DownIconColored from "@/public/images/downIconColored.svg";
import DownIcon from "@/public/images/downIcon.svg";
import { filterHandler } from "@/utils/helper";
import Image from "next/image";

const TradeShows = ({
  data,
  solutions,
  logos,
  trustPartnerLogos,
  clientTestimonials,
  hotSpot,
  loadingSc,
}) => {
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  const [selectedTab, setSelectedTab] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const { top: div1Top } = tab1Ref?.current?.getBoundingClientRect();
      const { top: div2Top } = tab2Ref?.current?.getBoundingClientRect();
      const { top: div3Top } = tab3Ref?.current?.getBoundingClientRect();
      const { top: div4Top } = tab4Ref?.current?.getBoundingClientRect();
      if (div4Top <= window?.innerHeight) {
        setSelectedTab(4);
      } else if (div3Top <= window?.innerHeight) {
        setSelectedTab(3);
      } else if (div2Top <= window?.innerHeight) {
        setSelectedTab(2);
      } else if (div1Top <= window?.innerHeight) {
        setSelectedTab(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToRef = (id) => {
    const reference =
      id === 1
        ? tab1Ref
        : id === 2
        ? tab2Ref
        : id === 3
        ? tab3Ref
        : id === 4
        ? tab4Ref
        : null;
    if (reference && reference.current) {
      const targetPosition = reference.current.getBoundingClientRect().top;
      window.scrollTo({
        top: targetPosition + (window.pageYOffset - 100),
        behavior: "smooth",
      });
    }
  };

  const renderSolutions = () => {
    return (
      <>
        {solutions?.length > 0 && (
          <div className="bg-off-white flex items-center lg:justify-center justify-start px-3 py-5 sticky xl:top-20 lg:top-16 top-16 bottom-0 z-20 overflow-auto no-scrollbar">
            {filterHandler(solutions)?.map((item, index) => (
              <div
                onMouseOver={() => setHoverIndex(item?.id)}
                onMouseOut={() => setHoverIndex(null)}
                key={index}
                className="flex items-center gap-[8px] cursor-pointer mr-[80px]"
                onClick={() => {
                  setSelectedTab(item?.id);
                  scrollToRef(item?.id);
                }}>
                <Image
                  className="w-[24px] h-[24px]"
                  src={
                    selectedTab === item?.id || hoverIndex === item?.id
                      ? DownIconColored
                      : DownIcon
                  }
                  alt={"Tags"}
                  height={1000}
                  width={1000}
                />
                <div
                  className={`text-base ${
                    selectedTab === item?.id || hoverIndex === item?.id
                      ? "text-talque-blue-color"
                      : "text-talque-primary-color"
                  } font-medium whitespace-nowrap`}>
                  {item?.attributes?.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section className="bg-white">
      <Section1 data={data} logos={logos} loadingSc={loadingSc} />
      {renderSolutions()}
      <Section2
        data={data}
        trustPartnerLogos={trustPartnerLogos}
        hotSpot={hotSpot}
        tabRef={tab1Ref}
      />
      <Section3 data={data} tabRef={tab2Ref} />
      <Section4 data={data} tabRef={tab3Ref} />
      <Section5 data={data} tabRef={tab4Ref} />
      <YouWantMoreExperience data={data} />
      <HowWeDoIt data={data} />
      <CustomerVoice data={data} clientTestimonials={clientTestimonials} />
      <ContactOurDepartment data={data} />
      <div className="2xl:hidden xl:hidden lg:hidden block">
        <YouWantMoreExperience data={data} />
      </div>
      <YouWantMoreExperience data={data} />
    </section>
  );
};

export default TradeShows;
