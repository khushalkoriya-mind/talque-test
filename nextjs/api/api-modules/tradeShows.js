import { GetApi } from "../api-request-method/Get";

export const TRADESHOWSPAGE = {
  getTradeshowsData: (locale) =>
    GetApi(`/api/tradeshow?populate=deep&locale=${locale || "en"}`, false),
  getTradeshowsSolutionList: (locale) =>
    GetApi(
      `/api/tradeshow-solution-lists?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getTradeshowsLogos: (locale) =>
    GetApi(
      `/api/tradeshow-trust-logos?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getTradeshowsPartnerLogos: (locale) =>
    GetApi(
      `/api/trust-partner-logos?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getTradeShowsHotSpots: (locale) =>
    GetApi(
      `/api/tradeshows-hotspots?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
