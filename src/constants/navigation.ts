import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ContentType} from 'src/models';

export enum Route {
  LOGIN = 'Login',
  REGISTER = 'Register',
  HOME = 'Popular',
  DISCOVER = 'Discover',
  FAVORITE = 'Favorite',
  PROFILE = 'Profile',
  AUTH = 'Auth',
  HOME_NAVIGATOR = 'HomeNavigator',
  DETAILS = 'Details',
  SETTINGS = 'Settings',
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
  Favorite: undefined;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type ExploreRouteProp = RouteProp<RootStackParamList, 'Explore'>;
