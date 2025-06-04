import Section1 from "@/components/Blogs/Section1";
import Section2 from "@/components/Blogs/Section2";
import Section3 from "@/components/Blogs/Section3";
import ContactOurDepartment from "@/components/ContactOurDepartment";

const index = ({ data, blogs, blogTags }) => {
  return (
    <section>
      <Section1 data={data} />
      <Section2 data={data} blogs={blogs} blogTags={blogTags} />
      <Section3 data={data} />
      <ContactOurDepartment data={data} />
    </section>
  );
};

export default index;
