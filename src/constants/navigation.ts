import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ContentType} from 'src/models';

export enum Route {
  LOGIN = 'Login',
  REGISTER = 'Register',
  HOME = 'Popular',
  DISCOVER = 'Discover',
  WATCHLIST = 'Watchlist',
  PROFILE = 'Profile',
  AUTH = 'Auth',
  HOME_NAVIGATOR = 'HomeNavigator',
  DETAILS = 'Details',
  SETTINGS = 'Settings',
  USER_EMAIL_FORM = 'UserEmailForm',
  USER_PASSWORD_FORM = 'UserPasswordForm',
  USERNAME_FORM = 'UserNameForm',
  CONTACT = 'Contact',
  INFO = 'Info',
  ACTOR = 'Actor',
}

type DetailsScreenParams = {
  posterPath: string;
  contentType: ContentType;
  id: number;
};

type ActorScreensParams = {
  id: number;
};

export type ExploreScreenParams = {
  isLiked: boolean;
};
type RootStackParamList = {
  Details: DetailsScreenParams;
  Explore: ExploreScreenParams;
  Actor: ActorScreensParams;
  Login: undefined;
  Register: undefined;
  Discover: undefined;
  Popular: undefined;
  Profile: undefined;
  Settings: undefined;
  Watchlist: undefined;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type ActorScreenRouteProp = RouteProp<RootStackParamList, 'Actor'>;

export type ActorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Actor'
>;

export type ExploreRouteProp = RouteProp<RootStackParamList, 'Explore'>;
