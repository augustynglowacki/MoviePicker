import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ActorScreen from 'src/screens/ActorScreen';
import {RootStackParamList, Route, SCREEN_OPTIONS} from 'src/constants';
import DetailsScreen from 'src/screens/DetailsScreen';
import OnboardingScreen from 'src/screens/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import BottomTabsNavigator from './BottomTabs/BottomTabsNavigator';
import SettingsNavigator from './SettingsNavigator';

const Stack = createStackNavigator<RootStackParamList>();
interface Props {
  firstLaunch: boolean;
}
function HomeNavigator(props: Props) {
  const {firstLaunch} = props;

  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      {firstLaunch && (
        <Stack.Screen name={Route.ONBOARDING} component={OnboardingScreen} />
      )}
      <Stack.Screen
        name={Route.HOME_NAVIGATOR}
        component={BottomTabsNavigator}
      />
      <Stack.Screen name={Route.AUTH} component={AuthNavigator} />
      <Stack.Screen name={Route.DETAILS} component={DetailsScreen} />
      <Stack.Screen name={Route.SETTINGS} component={SettingsNavigator} />
      <Stack.Screen name={Route.ACTOR} component={ActorScreen} />
      <Stack.Screen
        name={Route.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
