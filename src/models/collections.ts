import {Movie} from './movie';

export interface CollectionContent {
  id: number;
  title: string;
  collection: Movie[];
}
