import type { TmdbMovie } from "./TmdbMovie";

export interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
