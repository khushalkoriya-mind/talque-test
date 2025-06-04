import Section1 from "@/components/Interaction/Section1";
import Section2 from "@/components/Interaction/Section2";
import Section3 from "@/components/Interaction/Section3";
import Section4 from "@/components/Interaction/Section4";
import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import ContactOurDepartment from "@/components/ContactOurDepartment";

const index = ({ data, featureList, logo, loadingSc }) => {
  return (
    <section className="bg-white">
      <Section1 data={data} logo={logo} loadingSc={loadingSc} />
      <Section2 data={data} />
      <Section3 data={data} featureList={featureList} />
      <Section4 data={data} />
      <YouWantMoreExperience />
      <ContactOurDepartment />
    </section>
  );
};

export default index;
