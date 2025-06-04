import { Api } from "@/api";
import Home from "@/components/HomePage";
import { SeoComponent } from "@/utils/helper";
import { useState } from "react";

export default function HomePage({
  tradeshowsData,
  homepageData,
  solutionsList,
  solutionsBoxList,
  eventCalendarList,
  clientTestimonialList,
  tradeshowsPartnerList,
  hotspotList,
}) {
  const [seo, setSeo] = useState({});

  return (
    <>
      <SeoComponent title="Talque | Homepage" seo={seo} />
      <Home
        tradeshowsData={tradeshowsData}
        homepageData={homepageData}
        solutionsList={solutionsList}
        solutionsBoxList={solutionsBoxList}
        eventCalendarList={eventCalendarList}
        clientTestimonialList={clientTestimonialList}
        tradeshowsPartnerList={tradeshowsPartnerList}
        hotspotList={hotspotList}
      />
    </>
  );
}

export async function getServerSideProps() {
  const locale = "en";
  const tradeshowsResponse = await Api.getTradeshowsData(locale);
  let tradeshowsData = {};
  if (tradeshowsResponse?.status === 200) {
    tradeshowsData = tradeshowsResponse?.data?.data?.attributes;
  }

  const homepageResponse = await Api.getHomePageData(locale);
  let homepageData = {};
  if (homepageResponse?.status === 200) {
    homepageData = homepageResponse?.data?.data?.attributes;
  }

  const solutionsResponse = await Api.getSolutionList(locale);
  let solutionsList = [];
  if (solutionsResponse?.status === 200) {
    solutionsList = solutionsResponse?.data?.data;
  }

  const solutionBoxResponse = await Api.getSolutionBoxList(locale);
  let solutionsBoxList = [];
  if (solutionBoxResponse?.status === 200) {
    solutionsBoxList = solutionBoxResponse?.data?.data;
  }

  const eventCalendarResponse = await Api.getEventCalendarList(locale);
  let eventCalendarList = [];
  if (eventCalendarResponse?.status === 200) {
    eventCalendarList = eventCalendarResponse?.data?.data;
  }

  const clientTestimonialResp = await Api.getClientTestimonials(locale);
  let clientTestimonialList = [];
  if (clientTestimonialResp?.status === 200) {
    clientTestimonialList = clientTestimonialResp?.data?.data;
  }

  const tradeshowPartnerLogoResp = await Api.getTradeshowsPartnerLogos(locale);
  let tradeshowsPartnerList = [];
  if (tradeshowPartnerLogoResp?.status === 200) {
    tradeshowsPartnerList = tradeshowPartnerLogoResp?.data?.data;
  }

  const hotspotResponse = await Api.getHomepageHotSpots(locale);
  let hotspotList = [];
  if (hotspotResponse?.status === 200) {
    hotspotList = hotspotResponse?.data?.data;
  }

  return {
    props: {
      tradeshowsData,
      homepageData,
      solutionsList,
      solutionsBoxList,
      eventCalendarList,
      clientTestimonialList,
      tradeshowsPartnerList,
      hotspotList,
    },
  };
}
