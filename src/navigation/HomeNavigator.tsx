import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Details from '../screens/Details';
import Settings from '../screens/Settings';
import AuthNavigator from './AuthNavigator';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={BottomTabsNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Auth"
        component={AuthNavigator}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
