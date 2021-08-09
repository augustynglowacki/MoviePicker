import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Settings from 'src/components/settings/Settings';
import UserEmailForm from 'src/components/settings/userFroms/UserEmailForm';
import UserNameForm from 'src/components/settings/userFroms/UserNameForm';
import UserPasswordForm from 'src/components/settings/userFroms/UserPasswordForm';
import {Route} from 'src/constants';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.SETTINGS}
        component={Settings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.USERNAME_FORM}
        component={UserNameForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.USER_EMAIL_FORM}
        component={UserEmailForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Route.USER_PASSWORD_FORM}
        component={UserPasswordForm}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
