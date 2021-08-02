import {Genres} from '.';

interface Base {
  number_of_episodes?: number;
  number_of_seasons?: number;
  vote_average: number;
  poster_path: string;
  id: number;
  overview: string;
  genres: Genres[];
  release_date?: string;
}
export interface TvSeries {
  id: number;
  title: string;
  vote_average?: number;
  poster_path: string;
  overview: string;
  // english please and i prefer to change this property into -> type: 'movie' | 'tv-series'
  isMovie?: boolean;
}

export interface TvSeriesDetails extends Base {
  title: string;
}

export interface TvSeriesDetailsAxiosResponse extends Base {
  name: string;
}
