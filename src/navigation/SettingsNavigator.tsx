import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Settings from 'src/components/settings/Settings';
import Email from 'src/components/settings/userFroms/Email';
import Username from 'src/components/settings/userFroms/Username';
import Password from 'src/components/settings/userFroms/Password';
import {Route} from 'src/constants';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Route.SETTINGS} component={Settings} />
      <Stack.Screen name={Route.USERNAME_FORM} component={Username} />
      <Stack.Screen name={Route.USER_EMAIL_FORM} component={Email} />
      <Stack.Screen name={Route.USER_PASSWORD_FORM} component={Password} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
