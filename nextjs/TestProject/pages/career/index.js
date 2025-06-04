import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import Career from "@/components/Career";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const CareerPage = ({ positionList, careerPageData, teamList }) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [positionsList, setPositionsList] = useState(positionList ?? []);
  const [careerData, setCareerData] = useState(careerPageData ?? {});
  const [teamData, setTeamData] = useState(teamList ?? []);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getPositionsList();
      getCareerData();
      getTeamList();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [locale]);

  const getPositionsList = async () => {
    const response = await Api.getPositionsList(locale);
    if (response?.status === 200) {
      setPositionsList(response?.data?.data);
    } else {
      setPositionsList([]);
    }
  };

  const getCareerData = async () => {
    const response = await Api.getCarrerPageData(locale);
    if (response?.status === 200) {
      setCareerData(response?.data?.data?.attributes);
    } else {
      setCareerData({});
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

  return (
    <main className="relative">
      <SeoComponent title="Talque | Career" seo={seo} />
      {loading ? (
        <Loader />
      ) : (
        <Career
          loadingSc={loading}
          careerData={careerData}
          positionsList={positionsList}
          teamData={teamData}
        />
      )}
    </main>
  );
};

export default CareerPage;

export async function getServerSideProps() {
  const locale = "en";
  const positionResp = await Api.getPositionsList(locale);
  let positionList = [];
  if (positionResp?.status === 200) {
    positionList = positionResp?.data?.data;
  }

  const careerResp = await Api.getCarrerPageData(locale);
  let careerPageData = {};
  if (careerResp?.status === 200) {
    careerPageData = careerResp?.data?.data?.attributes;
  }

  const teamResp = await Api.getTeamList(locale);
  let teamList = [];
  if (teamResp?.status === 200) {
    teamList = teamResp?.data?.data;
  }

  return {
    props: {
      positionList,
      careerPageData,
      teamList,
    },
  };
}
