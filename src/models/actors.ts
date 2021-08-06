interface Base {
  name: string;
  id: number;
}

export interface Actor extends Base {
  profilePath: string;
}
export interface ActorApi extends Base {
  profile_path: string;
}
export interface DetailsActorsAxiosResponse {
  cast: ActorApi[];
}
export interface SearchActorsAxiosResponse {
  results: ActorApi[];
}
