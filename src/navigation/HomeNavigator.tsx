import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Route} from 'src/constants';
import Details from 'src/screens/Details';
import Settings from 'src/screens/Settings';
import AuthNavigator from './AuthNavigator';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.HOME_NAVIGATOR}
        component={BottomTabsNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.AUTH}
        component={AuthNavigator}
      />
      <Stack.Screen
        name={Route.DETAILS}
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.SETTINGS}
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
