import { errorToast, getLocalStorageItem } from "@/utils/helper";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export const PutApi = (tag = "", reqBody, isHeader) => {
  return axios
    .put(API_BASE_URL + tag, reqBody !== null && reqBody, {
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
      if (e?.response?.data?.message) {
        errorToast(e?.response?.data?.message);
      } else {
        errorToast("Something went wrong");
      }
    });
};
