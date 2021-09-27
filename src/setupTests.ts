/* eslint-disable no-undef */
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'react-native-gesture-handler/jestSetup';

// Native event firebase mock
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

//Reanimated mock, required for navigation according to navigation docs
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for call immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  return Reanimated;
});
// Silence the warning: Animated: useNativeDriver is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// Navigation mock
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

Enzyme.configure({adapter: new EnzymeAdapter()});
