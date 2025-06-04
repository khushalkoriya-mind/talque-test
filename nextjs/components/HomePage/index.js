import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import Section1 from "@/components/HomePage/Section1";
import Section2 from "@/components/HomePage/Section2";
import Section3 from "@/components/HomePage/Section3";
import Section4 from "@/components/HomePage/Section4";
import Section5 from "@/components/HomePage/Section5";
import Section6 from "@/components/HomePage/Section6";
import Section7 from "@/components/HomePage/Section7";
import Section8 from "@/components/HomePage/Section8";
import CustomerVoice from "@/components/Tradeshows/CustomerVoice";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import HowWeDoIt from "@/components/Tradeshows/HowWeDoIt";
import GetLatestUpdate from "@/components/GetLatestUpdate";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const HomePage = ({
  tradeshowsData,
  homepageData,
  solutionsList,
  solutionsBoxList,
  eventCalendarList,
  clientTestimonialList,
  tradeshowsPartnerList,
  hotspotList,
}) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [data, setData] = useState(homepageData ?? {});
  const [solutions, setSolutions] = useState(solutionsList ?? []);
  const [solutionBox, setSolutionBox] = useState(solutionsBoxList ?? []);
  const [eventCalendar, setEventCalendar] = useState(eventCalendarList ?? []);
  const [clientTestimonials, setClientTestimonials] = useState(
    clientTestimonialList ?? []
  );
  const [trustPartnerLogos, setTrustPartnerLogos] = useState(
    tradeshowsPartnerList ?? []
  );
  const [tradeShowsData, setTradeshowsData] = useState(tradeshowsData ?? {});
  const [hotSpot, setHotSpot] = useState(hotspotList ?? []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getTradeshowsData();
      getHomePageData();
      getSolutionsList();
      getSolutionBoxList();
      getEventCalendarList();
      getClientTestimonialList();
      getTradeshowsPartnerLogoList();
      getHomepageHotSpotList();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [locale]);

  const getTradeshowsData = async () => {
    const response = await Api.getTradeshowsData(locale);
    if (response?.status === 200) {
      setTradeshowsData(response?.data?.data?.attributes);
    } else {
      setTradeshowsData({});
    }
  };

  const getHomePageData = async () => {
    const response = await Api.getHomePageData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  const getSolutionsList = async () => {
    const response = await Api.getSolutionList(locale);
    if (response?.status === 200) {
      setSolutions(response?.data?.data);
    } else {
      setSolutions([]);
    }
  };

  const getSolutionBoxList = async () => {
    const response = await Api.getSolutionBoxList(locale);
    if (response?.status === 200) {
      setSolutionBox(response?.data?.data);
    } else {
      setSolutionBox([]);
    }
  };

  const getEventCalendarList = async () => {
    const response = await Api.getEventCalendarList(locale);
    if (response?.status === 200) {
      setEventCalendar(response?.data?.data);
    } else {
      setEventCalendar([]);
    }
  };

  const getClientTestimonialList = async () => {
    const response = await Api.getClientTestimonials(locale);
    if (response?.status === 200) {
      setClientTestimonials(response?.data?.data);
    } else {
      setClientTestimonials([]);
    }
  };

  const getTradeshowsPartnerLogoList = async () => {
    const response = await Api.getTradeshowsPartnerLogos(locale);
    if (response?.status === 200) {
      setTrustPartnerLogos(response?.data?.data);
    } else {
      setTrustPartnerLogos([]);
    }
  };

  const getHomepageHotSpotList = async () => {
    const response = await Api.getHomepageHotSpots(locale);
    if (response?.status === 200) {
      setHotSpot(response?.data?.data);
    } else {
      setHotSpot([]);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Section1 data={data} loadingSc={loading} />
      {solutions?.length > 0 && <Section2 solutions={solutions} />}
      <Section3 data={data} hotSpot={hotSpot} />
      <Section4 data={data} trustPartnerLogos={trustPartnerLogos} />
      <Section5 data={data} solutionBox={solutionBox} />
      <Section6 data={data} />
      <Section7 data={data} />
      <Section8 data={data} eventCalendar={eventCalendar} />
      <YouWantMoreExperience data={data} />
      <CustomerVoice data={data} clientTestimonials={clientTestimonials} />
      <HowWeDoIt data={tradeShowsData} />
      <GetLatestUpdate data={tradeShowsData} />
    </>
  );
};

export default HomePage;
