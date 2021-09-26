import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, Route, SCREEN_OPTIONS} from 'src/constants';
import LoginScreen from 'src/screens/LoginScreen';
import RegisterScreen from 'src/screens/RegisterScreen';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator<RootStackParamList>();

  return (
    <AuthStack.Navigator screenOptions={SCREEN_OPTIONS}>
      <AuthStack.Screen name={Route.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={Route.REGISTER} component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
