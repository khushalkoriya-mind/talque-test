import { GetApi } from "../api-request-method/Get";

export const INTERACTION = {
  getInteractionData: (locale) =>
    GetApi(`/api/interaction?populate=deep&locale=${locale || "en"}`, false),
  getFeatureList: (locale) =>
    GetApi(
      `/api/interaction-features?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
