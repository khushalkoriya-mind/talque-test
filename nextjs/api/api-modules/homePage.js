import { GetApi } from "../api-request-method/Get";

export const HOMEPAGE = {
  getHomePageData: (locale) =>
    GetApi(`/api/home-page?populate=deep&locale=${locale || "en"}`, false),
  getSolutionList: (locale) =>
    GetApi(`/api/solutions?populate=deep&locale=${locale || "en"}`, false),
  getSolutionBoxList: (locale) =>
    GetApi(`/api/solution-boxes?populate=deep&locale=${locale || "en"}`, false),
  getEventCalendarList: (locale) =>
    GetApi(
      `/api/event-calendars?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getHomepageHotSpots: (locale) =>
    GetApi(
      `/api/homepage-hotspots?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
