import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Settings from 'src/components/settings/Settings';
import Email from 'src/components/settings/userForms/Email';
import Username from 'src/components/settings/userForms/Username';
import Password from 'src/components/settings/userForms/Password';
import {RootStackParamList, Route, SCREEN_OPTIONS} from 'src/constants';
import Contact from 'src/components/settings/userForms/Contact';
import Info from 'src/components/settings/userForms/Info';
import Webview from 'src/components/webview/Webview';

const Stack = createStackNavigator<RootStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name={Route.SETTINGS} component={Settings} />
      <Stack.Screen name={Route.USERNAME_FORM} component={Username} />
      <Stack.Screen name={Route.USER_EMAIL_FORM} component={Email} />
      <Stack.Screen name={Route.USER_PASSWORD_FORM} component={Password} />
      <Stack.Screen name={Route.INFO} component={Info} />
      <Stack.Screen name={Route.CONTACT} component={Contact} />
      <Stack.Screen name={Route.WEBVIEW} component={Webview} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
