import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './src/navigation/HomeNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default App;
