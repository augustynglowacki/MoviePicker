import {ContentType} from './contentType';

export interface BackendEntity {
  id: string;
  movieId: number;
  title: string;
  voteAverage: number;
  posterPath: string;
  overview: string;
  genres: string[];
  contentType: ContentType;
}
