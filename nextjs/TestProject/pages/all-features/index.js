import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import AllFeatures from "@/components/AllFeatures";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

const AllFeaturesPage = ({ featuresData }) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(featuresData ?? {});

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getAllFeatures();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const getAllFeatures = async () => {
    const response = await Api.getAllFeatures(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | All Features" seo={seo} />
      {loading ? <Loader /> : <AllFeatures data={data} />}
    </main>
  );
};

export default AllFeaturesPage;

export async function getServerSideProps() {
  const locale = "en";
  const featureResp = await Api.getAllFeatures(locale);
  let featuresData = {};
  if (featureResp?.status === 200) {
    featuresData = featureResp?.data?.data?.attributes;
  }

  return {
    props: {
      featuresData,
    },
  };
}
