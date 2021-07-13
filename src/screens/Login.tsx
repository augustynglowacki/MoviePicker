import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {REGISTER} from '../models/constants/routeNames';

const Login = () => {
  const {navigate} = useNavigation();

  const navigateTo = () => {
    navigate(REGISTER);
  };

  return (
    <View style={styles.wrapper}>
      <Text>Login </Text>
      <TouchableOpacity>
        <Text onPress={navigateTo} style={styles.link}>
          Do you want to register?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  link: {color: '#4bb7ff'},
});
