import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AUTH,
  DETAILS,
  HOME_NAVIGATOR,
  SETTINGS,
} from '../models/constants/routeNames';
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
        name={HOME_NAVIGATOR}
        component={BottomTabsNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={AUTH}
        component={AuthNavigator}
      />
      <Stack.Screen
        name={DETAILS}
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen name={SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
