export interface Movie {
  id: number; //id filmu
  title: string; //tytul
  vote_average?: number; //srednia ocen
  poster_path: string; //ściezka do zdjęcia
  overview: string; //opis filmu
  genre_ids: number[]; // gatunki
  mergeGenresWithMovies?: any;
}
