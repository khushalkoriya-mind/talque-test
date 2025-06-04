import axios from "axios";
import { getLocalStorageItem } from "@/utils/helper";
import { ErrorHandler } from "./ErrorHandler";
import { API_BASE_URL } from "@/utils/config";

export const GetApi = (tag = "", isHeader = false) => {
  return axios
    .get(API_BASE_URL + tag, {
      headers: isHeader
        ? {
            Authorization: getLocalStorageItem("token"),
          }
        : {},
    })
    .then((data) => {
      if (data.status === 200) {
        return data;
      } else {
        return data;
      }
    })
    .catch(async (e) => {
      ErrorHandler(e);
    });
};
