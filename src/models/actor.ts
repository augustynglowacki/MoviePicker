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

export interface ActorDetailApi extends ActorApi {
  birthday: string; //date?
  known_for_department: string;
  deathday: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  homepage: string;
}

export interface ActorDetail extends Actor {
  birthday: string; //date?
  department: string;
  deathday: string;
  knownAs: string[];
  gender: number;
  biography: string;
  popularity: number;
  placeOfBirth: string;
  homepage: string;
}

export interface ActorState {
  loading: boolean;
  error: string;
  actor: ActorDetail;
}
