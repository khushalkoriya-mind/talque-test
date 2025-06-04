import { GetApi } from "../api-request-method/Get";

export const CAREERPAGE = {
  getPositionsList: (locale) =>
    GetApi(`/api/open-positions?populate=deep&locale=${locale || "en"}`, false),
  getCarrerPageData: (locale) =>
    GetApi(`/api/career?populate=deep&locale=${locale || "en"}`, false),
  getPositionsListById: (locale, slug) =>
    GetApi(
      `/api/open-positions/${slug}?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
