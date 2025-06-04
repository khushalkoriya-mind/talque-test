import React, { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import TradeShows from "@/components/Tradeshows";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const TradeshowPage = ({
  tradeshowsData,
  solutionsList,
  hotspotList,
  logosList,
  partnerLogoList,
  clientTestimonialList,
}) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(tradeshowsData ?? {});
  const [solutions, setSolutions] = useState(solutionsList ?? []);
  const [logos, setLogos] = useState(logosList ?? []);
  const [trustPartnerLogos, setTrustPartnerLogos] = useState(
    partnerLogoList ?? []
  );
  const [clientTestimonials, setClientTestimonials] = useState(
    clientTestimonialList ?? []
  );
  const [hotSpot, setHotSpot] = useState(hotspotList ?? []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getTradeshowsData();
      getSolutionList();
      getHotSpotList();
      getLogoList();
      getTrustPartnerLogoList();
      getClientTestimonialList();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [locale]);

  const getTradeshowsData = async () => {
    const response = await Api.getTradeshowsData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  const getSolutionList = async () => {
    const response = await Api.getTradeshowsSolutionList(locale);
    if (response?.status === 200) {
      setSolutions(response?.data?.data);
    } else {
      setSolutions([]);
    }
  };

  const getHotSpotList = async () => {
    const response = await Api.getTradeShowsHotSpots(locale);
    if (response?.status === 200) {
      setHotSpot(response?.data?.data);
    } else {
      setHotSpot([]);
    }
  };

  const getLogoList = async () => {
    const response = await Api.getTradeshowsLogos(locale);
    if (response?.status === 200) {
      setLogos(response?.data?.data);
    } else {
      setLogos([]);
    }
  };

  const getTrustPartnerLogoList = async () => {
    const response = await Api.getTradeshowsPartnerLogos(locale);
    if (response?.status === 200) {
      setTrustPartnerLogos(response?.data?.data);
    } else {
      setTrustPartnerLogos([]);
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

  return (
    <main>
      <SeoComponent title="Talque | Tradeshow" seo={seo} />
      {loading ? (
        <Loader />
      ) : (
        <TradeShows
          loadingSc={loading}
          data={data}
          solutions={solutions}
          logos={logos}
          trustPartnerLogos={trustPartnerLogos}
          clientTestimonials={clientTestimonials}
          hotSpot={hotSpot}
        />
      )}
    </main>
  );
};

export default TradeshowPage;

export async function getServerSideProps() {
  const locale = "en";
  const tradeshowsResponse = await Api.getTradeshowsData(locale);
  let tradeshowsData = {};
  if (tradeshowsResponse?.status === 200) {
    tradeshowsData = tradeshowsResponse?.data?.data?.attributes;
  }

  const solutionsResp = await Api.getTradeshowsSolutionList(locale);
  let solutionsList = [];
  if (solutionsResp?.status === 200) {
    solutionsList = solutionsResp?.data?.data;
  }

  const hotspotResp = await Api.getTradeShowsHotSpots(locale);
  let hotspotList = [];
  if (hotspotResp?.status === 200) {
    hotspotList = hotspotResp?.data?.data;
  }

  const logosResp = await Api.getTradeshowsLogos(locale);
  let logosList = [];
  if (logosResp?.status === 200) {
    logosList = logosResp?.data?.data;
  }

  const partnerLogoResp = await Api.getTradeshowsPartnerLogos(locale);
  let partnerLogoList = [];
  if (partnerLogoResp?.status === 200) {
    partnerLogoList = partnerLogoResp?.data?.data;
  }

  const clientTestimonialResp = await Api.getClientTestimonials(locale);
  let clientTestimonialList = [];
  if (clientTestimonialResp?.status === 200) {
    clientTestimonialList = clientTestimonialResp?.data?.data;
  }

  return {
    props: {
      tradeshowsData,
      solutionsList,
      hotspotList,
      logosList,
      partnerLogoList,
      clientTestimonialList,
    },
  };
}
