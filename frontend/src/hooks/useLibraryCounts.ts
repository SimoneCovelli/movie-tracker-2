import { useState, useEffect } from "react";
import type { LibraryCounts } from "../types/LibraryCounts";
import { getLibraryCounts } from "../services/myLibraryServices";

type UseLibraryCountsResult = {
  movieCounts: LibraryCounts | null;
  loadingCounts: boolean;
};

function useLibraryCounts(): UseLibraryCountsResult {
  const [movieCounts, setMovieCounts] = useState<LibraryCounts | null>(null);
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    async function loadTags(): Promise<void> {
      try {
        setLoadingCounts(true);
        const counts = await getLibraryCounts();
        setMovieCounts(counts);
      } catch (caughtError) {
        console.error(caughtError);
        setMovieCounts(null);
      } finally {
        setLoadingCounts(false);
      }
    }

    loadTags();
  }, []);

  return { movieCounts, loadingCounts };
}

export default useLibraryCounts;
