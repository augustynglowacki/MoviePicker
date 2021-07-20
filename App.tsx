import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import colors from './src/assets/theme/colors';

//app background changed to black
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.black,
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default App;
