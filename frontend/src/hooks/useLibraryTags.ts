import { useState, useEffect } from "react";
import { getTags } from "../services/myLibraryServices";

type UseLibraryTagsResult = {
  libraryTags: string[];
  loadingTags: boolean;
};

function useLibraryTags(): UseLibraryTagsResult {
  const [libraryTags, setLibraryTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    async function loadTags(): Promise<void> {
      try {
        setLoadingTags(true);
        const tags = await getTags();
        setLibraryTags(tags);
      } catch (caughtError) {
        console.error(caughtError);
        setLibraryTags([]);
      } finally {
        setLoadingTags(false);
      }
    }

    loadTags();
  }, []);

  return { libraryTags, loadingTags };
}

export default useLibraryTags;
