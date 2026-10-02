import { useState, useEffect } from "react";
import { getTags } from "../services/myLibraryServices";

type UseLibraryTagsResult = {
  movieTags: string[];
  loadingTags: boolean;
};

function useLibraryTags(): UseLibraryTagsResult {
  const [movieTags, setMovieTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    async function loadTags(): Promise<void> {
      try {
        setLoadingTags(true);
        const tags = await getTags();
        setMovieTags(tags);
      } catch (caughtError) {
        console.error(caughtError);
        setMovieTags([]);
      } finally {
        setLoadingTags(false);
      }
    }

    loadTags();
  }, []);

  return { movieTags, loadingTags };
}

export default useLibraryTags;
