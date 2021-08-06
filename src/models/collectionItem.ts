import {ContentType} from './contentType';
export interface CollectionItem {
  id: string;
  movieId: number;
  title: string;
  voteAverage: number;
  posterPath: string;
  overview: string;
  genres: string[];
  contentType: ContentType;
}
