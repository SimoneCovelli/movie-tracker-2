export interface Movie {
  id: number;
  title: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
}
