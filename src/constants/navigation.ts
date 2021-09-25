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
export type RootStackParamList = {
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
  Auth: undefined;
  HomeNavigator: undefined;
  UserEmailForm: undefined;
  UserPasswordForm: undefined;
  UserNameForm: undefined;
  Contact: undefined;
  Info: undefined;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type ExploreRouteProp = RouteProp<RootStackParamList, 'Explore'>;

export type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterScreenProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type DiscoverScreenProp = StackNavigationProp<
  RootStackParamList,
  'Discover'
>;
export type ProfileScreenProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
export type ExploreScreenProp = StackNavigationProp<
  RootStackParamList,
  'Explore'
>;
export type PopularScreenProp = StackNavigationProp<
  RootStackParamList,
  'Popular'
>;
export type WatchlistScreenProp = StackNavigationProp<
  RootStackParamList,
  'Watchlist'
>;
export type OnbardingScreenProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;
export type SettingScreenProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export type AuthScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;
export type HomeNavigatorScreenProp = StackNavigationProp<
  RootStackParamList,
  'HomeNavigator'
>;
export type UserEmailFormScreenProp = StackNavigationProp<
  RootStackParamList,
  'UserEmailForm'
>;
export type UserPasswordFormScreenProp = StackNavigationProp<
  RootStackParamList,
  'UserPasswordForm'
>;
export type UserNameFormScreenProp = StackNavigationProp<
  RootStackParamList,
  'UserNameForm'
>;
export type ContactScreenProp = StackNavigationProp<
  RootStackParamList,
  'Contact'
>;
export type InfoScreenProp = StackNavigationProp<RootStackParamList, 'Info'>;
