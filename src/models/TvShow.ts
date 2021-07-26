export interface TvShow {
  id: number;
  title: string;
  vote_average?: number;
  poster_path: string;
  overview: string;
  isMovie?: boolean; //w naszym api filmy i seriale to różne kolekcje, które mogą posiadać to samo id, przez co potrzebujemy flagi, by je rozróżnić w przypadku tego samego id.
}
