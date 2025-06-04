import { GetApi } from "../api-request-method/Get";

export const BLOG = {
  getBlogData: (locale) =>
    GetApi(`/api/blog?populate=deep&locale=${locale || "en"}`, false),
  getBlogList: (locale, pageNumber, limit, query) =>
    GetApi(
      `/api/blog-details?populate=deep&locale=${
        locale || "en"
      }&pagination[page]=${pageNumber}&pagination[pageSize]=${limit}&${query}`,
      false
    ),
  getBlogTag: (locale) =>
    GetApi(`/api/blog-tags?populate=deep&locale=${locale || "en"}`, false),
  getBlogById: (locale, slug) =>
    GetApi(
      `/api/blog-details/${slug}?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
