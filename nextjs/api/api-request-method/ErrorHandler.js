import { clearLocalStorage } from "@/utils/helper";

export const ErrorHandler = async (e) => {
  if (e?.response?.data?.code === 401) {
    clearLocalStorage();
  } else if (e?.response?.data?.code === 403) {
    window.location.href = "/projects";
  } else if (e?.response?.data?.code === 400) {
    alert(e?.response?.data?.message);
  } else if (
    e?.response?.data?.code === 404 ||
    e?.response?.data?.code === 500
  ) {
    alert(e?.response?.data?.message);
  } else if (e?.response?.data?.code === 503) {
    window.location.href = `${window.location.origin}/under-maintenance`;
  }
};
