export interface TvShow {
  // ➡️ TvSeries
  id: number;
  title: string;
  vote_average?: number; // camelCase
  poster_path: string;
  overview: string;
  // english please and i prefer to change this property into -> type: 'movie' | 'tv-series'
  isMovie?: boolean; //w naszym api filmy i seriale to różne kolekcje, które mogą posiadać to samo id, przez co potrzebujemy flagi, by je rozróżnić w przypadku tego samego id.
}

// Do not make every single type in the separated files
// make one -> movie.ts tvSeries.ts etc
