import { GetApi } from "../api-request-method/Get";

export const ALLFEATURES = {
  getAllFeatures: (locale) =>
    GetApi(`/api/all-feature?populate=deep&locale=${locale || "en"}`, false),
};
