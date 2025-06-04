import { GetApi } from "@/api/api-request-method/Get";
import { PostApi } from "../api-request-method/Post";

export const GLOBAL = {
  getNavigationList: (locale) =>
    GetApi(`/api/navigation?populate=deep&locale=${locale || "en"}`, false),
  getFooterList: (locale) =>
    GetApi(`/api/footer?populate=deep&locale=${locale || "en"}`, false),
  addLatestUpdateMail: (payload) =>
    PostApi("/api/get-latest-updates", payload, false),
  getClientTestimonials: (locale) =>
    GetApi(
      `/api/client-testimonials?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getTeamList: (locale) =>
    GetApi(
      `/api/get-team-details?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getYouWantMoreExperienceData: (locale) =>
    GetApi(
      `/api/want-more-experience?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
