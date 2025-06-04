import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import Interaction from "@/components/Interaction";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const InteractionPage = ({ interactionData, logoList, featuresList }) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(interactionData ?? {});
  const [featureList, setFeatureList] = useState(featuresList ?? []);
  const [logo, setLogo] = useState(logoList ?? []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getInteractionData();
      getFeatureList();
      getLogoList();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [locale]);

  const getInteractionData = async () => {
    const response = await Api.getInteractionData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  const getFeatureList = async () => {
    const response = await Api.getTradeshowsLogos(locale);
    if (response?.status === 200) {
      setLogo(response?.data?.data);
    } else {
      setLogo([]);
    }
  };

  const getLogoList = async () => {
    const response = await Api.getFeatureList(locale);
    if (response?.status === 200) {
      setFeatureList(response?.data?.data);
    } else {
      setFeatureList([]);
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | Interaction" seo={seo} />
      {loading ? (
        <Loader />
      ) : (
        <Interaction
          data={data}
          featureList={featureList}
          logo={logo}
          loadingSc={loading}
        />
      )}
    </main>
  );
};

export default InteractionPage;

export async function getServerSideProps() {
  const locale = "en";
  const interactionResp = await Api.getInteractionData(locale);
  let interactionData = {};
  if (interactionResp?.status === 200) {
    interactionData = interactionResp?.data?.data?.attributes;
  }

  const logosResp = await Api.getTradeshowsLogos(locale);
  let logoList = [];
  if (logosResp?.status === 200) {
    logoList = logosResp?.data?.data;
  }

  const featuresResp = await Api.getFeatureList(locale);
  let featuresList = [];
  if (featuresResp?.status === 200) {
    featuresList = featuresResp?.data?.data;
  }

  return {
    props: {
      interactionData,
      logoList,
      featuresList,
    },
  };
}
