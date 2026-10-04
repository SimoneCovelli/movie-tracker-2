import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToast from "./useToast";

type UseMovieDeletedToastResult = {
  showSuccessToast: boolean;
  successToastMessage: string;
};

function useMovieDeletedToast(): UseMovieDeletedToastResult {
  const location = useLocation();
  const navigate = useNavigate();

  const { showSuccessToast, successToastMessage, showSuccessToastTemporarily } =
    useToast();

  useEffect(() => {
    if (!location.state?.movieDeleted) return;

    showSuccessToastTemporarily("Movie deleted");

    navigate(location.pathname + location.search, {
      replace: true,
      state: null,
    });
  }, []);

  return {
    showSuccessToast,
    successToastMessage,
  };
}

export default useMovieDeletedToast;
