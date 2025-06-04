export const LANGUAGE_DATA = [
  { id: 1, label: "English", shortText: "en" },
  { id: 2, label: "German", shortText: "de" },
];

export const PaginationValues = {
  totalCount: 0,
  siblingCount: 0,
  currentPage: 1,
  pageSize: 10,
};

export const PER_PAGE = [
  { name: "8", value: 8 },
  { name: "25", value: 25 },
  { name: "50", value: 50 },
  { name: "100", value: 100 },
];

export const LIST_PER_PAGE = [
  { name: "10", value: 10 },
  { name: "25", value: 25 },
  { name: "50", value: 50 },
  { name: "100", value: 100 },
];

export const defaultLanguage = {
  id: 1,
  label: "English",
  shortText: "en",
};

export const sliderGlobalConfig = {
  autoplay: true,
  autoplaySpeed: 1600,
  infinite: true,
};

export const defaultBlogFilter = {
  id: null,
  attributes: { title: "All blogs" },
};
