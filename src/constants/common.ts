import {Dimensions, StatusBar} from 'react-native';

export const BOTTOM_TABS_HEIGHT = 60;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const HEADER_HEIGHT = 300;
export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  gestureResponseDistance: 200,
};
export const DEFAULT_COVER =
  'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultCover.jpg?alt=media&token=b5744349-b6d7-4811-9ddb-dddacf2c2d29';
export const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultAvatar.png?alt=media&token=e8f0dd01-d427-4734-b161-504d46c7893c';
