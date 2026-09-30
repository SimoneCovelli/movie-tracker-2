import type { Movie } from "../types/Movie";

export interface LibraryMovie extends Movie {
  status: "watched" | "to-watch";
  rating: number | null;
  tags: string[];
}
