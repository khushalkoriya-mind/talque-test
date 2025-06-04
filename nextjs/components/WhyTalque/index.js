import Section1 from "@/components/WhyTalque/Section1";
import Section2 from "@/components/WhyTalque/Section2";
import Section3 from "@/components/WhyTalque/Section3";
import Section4 from "@/components/WhyTalque/Section4";
import Section5 from "@/components/WhyTalque/Section5";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import GetToKnowTheTeam from "@/components/GetToKnowTheTeam";

const index = ({ data, teamData, hotSpot, afterData, loadingSc }) => {
  return (
    <section className="bg-white">
      <Section1 data={data} loadingSc={loadingSc} />
      <Section2 data={data} />
      <Section3 data={data} hotSpot={hotSpot} />
      <Section4 data={data} afterData={afterData} />
      <Section5 data={data} />
      <section className="pt-28 small_rectangle_bg h-[450px] md:block hidden" />
      {teamData?.length > 0 && (
        <GetToKnowTheTeam teamData={teamData} data={data} />
      )}
      <YouWantMoreExperience />
    </section>
  );
};

export default index;
