import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Route} from 'src/constants';
import DetailsScreen from 'src/screens/DetailsScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import BottomTabsNavigator from 'src/navigation/BottomTabs/BottomTabsNavigator';
import AuthNavigator from './AuthNavigator';

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
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.SETTINGS}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
