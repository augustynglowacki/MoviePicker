import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Route} from 'src/models/constants/routeNames';
import Login from 'src/screens/Login';
import Register from 'src/screens/Register';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={Route.LOGIN} component={Login} />
      <AuthStack.Screen name={Route.REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
