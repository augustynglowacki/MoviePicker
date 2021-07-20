import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import colors from './src/assets/theme/colors';
import {NativeBaseProvider} from 'native-base';

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
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
