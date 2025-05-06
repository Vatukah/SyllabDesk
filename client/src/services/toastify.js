// utils/toast.js
import { toast } from "react-toastify";

export const showSuccess = (msg) =>
  toast.success(msg, { position: "top-right", autoClose: 3000 });

export const showError = (msg) =>
  toast.error(msg, { position: "top-right", autoClose: 3000 });

export const showInfo = (msg) =>
  toast.info(msg, { position: "top-right", autoClose: 3000 });

export const showWarning = (msg) =>
  toast.warning(msg, { position: "top-right", autoClose: 3000 });

export const showLoadingToast = (promise, { loading, success, error }) => {
  return toast.promise(promise, {
    pending: loading || "Loading...",
    success: success || "Success!",
    error: error || "Something went wrong.",
  });
};

export const toastWithServerMessage = async (promiseFn, messages = {}) => {
    let toastId;
  
    try {
      toastId = toast.loading(messages.loading || "Please wait...");
      
      const res = await promiseFn;
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || "Unexpected error");
  
      toast.update(toastId, {
        render: data.message || messages.success || "Success!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
  
      return data;
    } catch (err) {
      toast.update(toastId, {
        render: err.message || messages.error || "Something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
  
      throw err; // re-throw if the calling function needs it
    }
  };