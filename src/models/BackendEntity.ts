export interface BackendEntity {
  id: string;
  movieId: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  isMovie?: boolean;
}
