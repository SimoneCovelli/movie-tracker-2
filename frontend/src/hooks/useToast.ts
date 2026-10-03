import { useRef, useState } from "react";

type useToastResult = {
  showSuccessToast: boolean;
  showErrorToast: boolean;
  successToastMessage: string;
  errorToastMessage: string;
  showSuccessToastTemporarily: (successMessage: string) => void;
  showErrorToastTemporarily: (errorMessage: string) => void;
};

function useToast(): useToastResult {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [successToastMessage, setSuccessToastMessage] = useState("");
  const [errorToastMessage, setErrorToastMessage] = useState("");

  const toastTimeoutId = useRef<number | null>(null);

  const startToastTimeout = (setShowToast: (value: boolean) => void): void => {
    toastTimeoutId.current = window.setTimeout(() => {
      setShowToast(false);
      toastTimeoutId.current = null;
    }, 2500);
  };

  const showSuccessToastTemporarily = (successMessage: string): void => {
    if (toastTimeoutId.current !== null) clearTimeout(toastTimeoutId.current);
    setShowErrorToast(false);
    setSuccessToastMessage(successMessage);
    setShowSuccessToast(true);
    startToastTimeout(setShowSuccessToast);
  };

  const showErrorToastTemporarily = (errorMessage: string): void => {
    if (toastTimeoutId.current !== null) clearTimeout(toastTimeoutId.current);
    setShowSuccessToast(false);
    setErrorToastMessage(errorMessage);
    setShowErrorToast(true);
    startToastTimeout(setShowErrorToast);
  };

  return {
    showSuccessToast,
    showErrorToast,
    successToastMessage,
    errorToastMessage,
    showSuccessToastTemporarily,
    showErrorToastTemporarily,
  };
}

export default useToast;
