import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import WhyTalque from "@/components/WhyTalque";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const WhyTalquePage = ({
  whyTalqueData,
  teamList,
  hotspotList,
  afterDataList,
}) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(whyTalqueData ?? {});
  const [afterData, setAfterData] = useState(afterDataList ?? []);
  const [teamData, setTeamData] = useState(teamList ?? []);
  const [hotSpot, setHotSpot] = useState(hotspotList ?? []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getWhyTalqueData();
      getTeamList();
      getHotSpotList();
      getAfterHotSpotData();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [locale]);

  const getWhyTalqueData = async () => {
    const response = await Api.getWhyTalquePageData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  const getTeamList = async () => {
    const response = await Api.getTeamList(locale);
    if (response?.status === 200) {
      setTeamData(response?.data?.data);
    } else {
      setTeamData([]);
    }
  };

  const getHotSpotList = async () => {
    const response = await Api.getWhyTalquePageHotSpotData(locale);
    if (response?.status === 200) {
      setHotSpot(response?.data?.data);
    } else {
      setHotSpot([]);
    }
  };

  const getAfterHotSpotData = async () => {
    const response = await Api.getWhyTalquePageAfterData(locale);
    if (response?.status === 200) {
      setAfterData(response?.data?.data);
    } else {
      setAfterData([]);
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | Why Talque" seo={seo} />
      {loading ? (
        <Loader />
      ) : (
        <WhyTalque
          loadingSc={loading}
          data={data}
          teamData={teamData}
          hotSpot={hotSpot}
          afterData={afterData}
        />
      )}
    </main>
  );
};

export default WhyTalquePage;

export async function getServerSideProps() {
  const locale = "en";
  const whyTalqueResp = await Api.getWhyTalquePageData(locale);
  let whyTalqueData = {};
  if (whyTalqueResp?.status === 200) {
    whyTalqueData = whyTalqueResp?.data?.data?.attributes;
  }

  const teamResp = await Api.getTeamList(locale);
  let teamList = [];
  if (teamResp?.status === 200) {
    teamList = teamResp?.data?.data;
  }

  const hotspotResp = await Api.getWhyTalquePageHotSpotData(locale);
  let hotspotList = [];
  if (hotspotResp?.status === 200) {
    hotspotList = hotspotResp?.data?.data;
  }

  const afterdataResp = await Api.getWhyTalquePageAfterData(locale);
  let afterDataList = [];
  if (afterdataResp?.status === 200) {
    afterDataList = afterdataResp?.data?.data;
  }

  return {
    props: {
      whyTalqueData,
      teamList,
      hotspotList,
      afterDataList,
    },
  };
}
