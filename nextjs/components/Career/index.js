import Section1 from "@/components/Career/Section1";
import Section2 from "@/components/Career/Section2";
import Section3 from "@/components/Career/Section3";
import Section4 from "@/components/Career/Section4";
import GetToKnowTheTeam from "@/components/GetToKnowTheTeam";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";

const index = ({ careerData, positionsList, teamData, loadingSc }) => {
  return (
    <section>
      <Section1 data={careerData} loadingSc={loadingSc} />
      <Section2 data={careerData} />
      <Section3 data={careerData} OpenPositionsList={positionsList} />
      <Section4 data={careerData} />
      {teamData?.length > 0 && (
        <GetToKnowTheTeam data={careerData} teamData={teamData} />
      )}
      <YouWantMoreExperience />
    </section>
  );
};

export default index;
