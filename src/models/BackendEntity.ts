export interface BackendEntity {
  // weird name
  id: string;
  movieId: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  genres: string[];
  isMovie?: boolean; // type instead of isMovie
}
