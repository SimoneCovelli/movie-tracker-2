import { useRef, useState } from "react";

type useToastResult = {
  showSuccessToast: boolean;
  showErrorToast: boolean;
  showSuccessToastTemporarily: () => void;
  showErrorToastTemporarily: () => void;
};

function useToast(): useToastResult {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const toastTimeoutId = useRef<number | null>(null);

  const startToastTimeout = (setShowToast: (value: boolean) => void): void => {
    toastTimeoutId.current = window.setTimeout(() => {
      setShowToast(false);
      toastTimeoutId.current = null;
    }, 2500);
  };

  const showSuccessToastTemporarily = (): void => {
    if (toastTimeoutId.current !== null) clearTimeout(toastTimeoutId.current);
    setShowErrorToast(false);
    setShowSuccessToast(true);
    startToastTimeout(setShowSuccessToast);
  };

  const showErrorToastTemporarily = (): void => {
    if (toastTimeoutId.current !== null) clearTimeout(toastTimeoutId.current);
    setShowSuccessToast(false);
    setShowErrorToast(true);
    startToastTimeout(setShowErrorToast);
  };

  return {
    showSuccessToast,
    showErrorToast,
    showSuccessToastTemporarily,
    showErrorToastTemporarily,
  };
}

export default useToast;
