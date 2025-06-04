import { useContext, useEffect, useState } from "react";
import { Api } from "@/api";
import Blog from "@/components/Blogs";
import { SeoComponent } from "@/utils/helper";
import { LanguageContext } from "@/context/LanguageContext";

const BlogPage = ({ blogData, blogTagList }) => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(true);
  const [seo, setSeo] = useState({});
  const [data, setData] = useState(blogData ?? {});
  const [blogTags, setBlogTags] = useState(blogTagList ?? []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setLoading(false);
    } else {
      getBlogData();
      getTagList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const getBlogData = async () => {
    const response = await Api.getBlogData(locale);
    if (response?.status === 200) {
      setData(response?.data?.data?.attributes);
    } else {
      setData({});
    }
  };

  const getTagList = async () => {
    const response = await Api.getBlogTag(locale);
    if (response?.status === 200) {
      setBlogTags(response?.data?.data);
    } else {
      setBlogTags([]);
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | Blogs" seo={seo} />
      <Blog data={data} blogTags={blogTags} />
    </main>
  );
};

export default BlogPage;

export async function getServerSideProps() {
  const locale = "en";
  const blogResp = await Api.getBlogData(locale);
  let blogData = {};
  if (blogResp?.status === 200) {
    blogData = blogResp?.data?.data?.attributes;
  }

  const blogTagResp = await Api.getBlogTag(locale);
  let blogTagList = [];
  if (blogTagResp?.status === 200) {
    blogTagList = blogTagResp?.data?.data;
  }

  return {
    props: {
      blogData,
      blogTagList,
    },
  };
}
