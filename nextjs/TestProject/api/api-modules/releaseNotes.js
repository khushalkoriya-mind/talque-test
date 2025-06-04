import { GetApi } from "../api-request-method/Get";

export const RELEASENOTES = {
  getReleaseNoteData: (locale) =>
    GetApi(`/api/release-note?populate=deep&locale=${locale || "en"}`, false),
  getReleaseNotesList: (locale, pageNumber, limit, query) =>
    GetApi(
      `/api/release-note-lists?populate=deep&locale=${
        locale || "en"
      }&pagination[page]=${pageNumber}&pagination[pageSize]=${limit}&${query}`,
      false
    ),
  getReleaseNoteById: (locale, slug) =>
    GetApi(
      `/api/release-note-lists/${slug}?populate=deep&locale=${locale || "en"}`,
      false
    ),
};
