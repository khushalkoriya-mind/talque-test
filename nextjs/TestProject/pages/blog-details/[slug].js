import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/api";
import { SeoComponent, classes } from "@/utils/helper";
import BlogDetails from "@/components/BlogDetails";
import GetLatestUpdate from "@/components/GetLatestUpdate";
import ContactOurDepartment from "@/components/ContactOurDepartment";
import BlogListing from "@/components/Blogs/Section2/blogListing";
import { LanguageContext } from "@/context/LanguageContext";
import { defaultBlogFilter } from "@/utils/constant";

const BlogDetailsPage = () => {
  const { languageData } = useContext(LanguageContext);
  const locale = languageData?.shortText;
  const router = useRouter();
  const [blogDetail, setBlogDetail] = useState({});

  useEffect(() => {
    if (router?.query?.slug) {
      getBlogDetailById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, router?.query?.slug]);

  const getBlogDetailById = async () => {
    const slug = router?.query?.slug;
    const response = await Api.getBlogById(locale, slug);
    if (response?.status === 200) {
      setBlogDetail(response?.data?.data?.attributes);
    } else {
      setBlogDetail({});
    }
  };

  return (
    <main>
      <SeoComponent title="Talque | Blog Details" />
      <BlogDetails blogDetail={blogDetail} />
      <div className="blog_details_sec2_bg 2xl:px-60 xl:px-14 lg:px-6 px-5 lg:py-16 md:py-10 py-5">
        <div className={`${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} capitalize lg:mb-3 mb-2`}>
          Related blogs
        </div>
        <div
          className={`text-talque-secondary-color ${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} md:mb-10 mb-0 lg:w-[55%] w-full`}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </div>
        <BlogListing
          selectedFilter={defaultBlogFilter}
          isDetailPage
          slugID={router?.query?.slug}
        />
      </div>
      <GetLatestUpdate title={"Don’t miss anything with our newsletter!"} />
      <ContactOurDepartment />
    </main>
  );
};

export default BlogDetailsPage;
