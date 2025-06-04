import YouWantMoreExperience from "@/components/YouWantMoreExperience";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

const AllFeatures = ({ data }) => {
  return (
    <>
      <Section1 data={data} />
      <Section2 data={data} />
      <Section3 data={data} />
      <YouWantMoreExperience />
    </>
  );
};

export default AllFeatures;
