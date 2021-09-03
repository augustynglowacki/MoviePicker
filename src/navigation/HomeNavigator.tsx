import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Route, SCREEN_OPTIONS} from 'src/constants';
import DetailsScreen from 'src/screens/DetailsScreen';
import AuthNavigator from './AuthNavigator';
import BottomTabsNavigator from './BottomTabs/BottomTabsNavigator';
import SettingsNavigator from './SettingsNavigator';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen
        name={Route.HOME_NAVIGATOR}
        component={BottomTabsNavigator}
      />
      <Stack.Screen name={Route.AUTH} component={AuthNavigator} />
      <Stack.Screen name={Route.DETAILS} component={DetailsScreen} />
      <Stack.Screen name={Route.SETTINGS} component={SettingsNavigator} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
