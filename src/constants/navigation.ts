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
  ONBOARDING = 'Onboarding',
}

type DetailsScreenParams = {
  posterPath: string;
  contentType: ContentType;
  id: number;
};
export type ExploreScreenParams = {
  isLiked: boolean;
};
type RootStackParamList = {
  Details: DetailsScreenParams;
  Explore: ExploreScreenParams;
  Login: undefined;
  Register: undefined;
  Discover: undefined;
  Popular: undefined;
  Profile: undefined;
  Settings: undefined;
  Watchlist: undefined;
  Onboarding: undefined;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type ExploreRouteProp = RouteProp<RootStackParamList, 'Explore'>;
