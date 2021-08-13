import {Dimensions, StatusBar} from 'react-native';

export const BOTTOM_TABS_HEIGHT = 60;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const HEADER_HEIGHT = 300;
export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  gestureResponseDistance: {horizontal: 200},
};
