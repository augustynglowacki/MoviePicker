import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
