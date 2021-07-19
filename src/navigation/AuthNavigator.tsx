import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LOGIN, REGISTER} from '../models/constants/routeNames';
import Login from '../screens/Login';
import SingUp from '../screens/SingUp';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={SingUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
