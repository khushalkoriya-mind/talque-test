import axios from "axios";
import { getLocalStorageItem } from "@/utils/helper";
import { ErrorHandler } from "./ErrorHandler";
import { API_BASE_URL } from "@/utils/config";

export const PostApi = (tag = "", reqBody, isHeader = false) => {
  return axios
    .post(API_BASE_URL + tag, reqBody, {
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
      return e?.response?.data;
    });
};
