import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import ReleaseNotes from "@/components/ReleaseNotes";
import { SeoComponent, responseStatus } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";

const ReleaseNotePageUI = ({ releaseNoteData }) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(releaseNoteData ?? {});

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getReleaseNoteData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const getReleaseNoteData = async () => {
    const response = await Api.getReleaseNoteData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | Release Notes" seo={seo} />
      <ReleaseNotes data={data} />
    </main>
  );
};

export default ReleaseNotePageUI;

export async function getServerSideProps() {
  const locale = "en";
  const releaseNoteResp = await Api.getReleaseNoteData(locale);
  let releaseNoteData = {};
  if (releaseNoteResp?.status === 200) {
    releaseNoteData = releaseNoteResp?.data?.data?.attributes;
  }

  return {
    props: {
      releaseNoteData,
    },
  };
}
