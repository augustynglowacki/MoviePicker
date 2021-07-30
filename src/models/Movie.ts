export interface Movie {
  id: number; //id filmu
  title: string; //tytul
  vote_average: number; //srednia ocen
  poster_path: string; //ściezka do zdjęcia
  overview: string; //opis filmu
  genre_ids: number[]; // gatunki
  isMovie?: boolean; //w naszym api filmy i seriale to różne kolekcje, które mogą posiadać to samo id, przez co potrzebujemy flagi, by je rozróżnić w przypadku tego samego id.
}
