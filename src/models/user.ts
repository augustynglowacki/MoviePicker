export interface BackendUser {
  email: string;
  password: string;
  displayName: string;
}
export interface User {
  id: string;
  email: string;
  userName: string;
  avatar: string;
  coverPhoto: string;
}
export interface ActiveUser {
  userName: string;
  avatar: string;
  coverPhoto: string;
}

export interface UserState {
  loading: boolean;
  error: string;
  user: User;
}
