import { GLOBAL } from "./api-modules/global";
import { CAREERPAGE } from "./api-modules/careerPage";
import { TRADESHOWSPAGE } from "./api-modules/tradeShows";
import { HOMEPAGE } from "./api-modules/homePage";
import { WHYTALQUEPAGE } from "./api-modules/whyTalque";
import { INTERACTION } from "./api-modules/interaction";
import { BLOG } from "./api-modules/blog";
import { RELEASENOTES } from "./api-modules/releaseNotes";
import { ALLFEATURES } from "./api-modules/allFeatures";

export const Api = {
  ...CAREERPAGE,
  ...GLOBAL,
  ...TRADESHOWSPAGE,
  ...HOMEPAGE,
  ...WHYTALQUEPAGE,
  ...INTERACTION,
  ...BLOG,
  ...RELEASENOTES,
  ...ALLFEATURES,
};
