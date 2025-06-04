import { GetApi } from "../api-request-method/Get";

export const WHYTALQUEPAGE = {
  getWhyTalquePageData: (locale) =>
    GetApi(
      `/api/why-talque-page?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getWhyTalquePageAfterData: (locale) =>
    GetApi(
      `/api/why-talque-page-afters?populate=deep&locale=${locale || "en"}`,
      false
    ),
  getWhyTalquePageHotSpotData: (locale) =>
    GetApi(
      `/api/why-talque-page-hot-spots?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
