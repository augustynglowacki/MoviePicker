import {Genres} from './genres';
import {MovieBase} from './movie';
export interface TvSeriesDetails extends MovieBase {
  episodesCount?: number;
  seasonsCount?: number;
  genres: Genres[];
}
interface BaseApi {
  vote_average: number;
  poster_path: string;
  id: number;
  overview: string;
}
export interface TvSeriesDetailsAxiosResponse extends BaseApi {
  name: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres: Genres[];
}
