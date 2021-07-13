import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SETTINGS} from '../models/constants/routeNames';
const Account = () => {
  const {navigate} = useNavigation();

  const navigateTo = () => {
    navigate(SETTINGS);
  };

  return (
    <View style={styles.wrapper}>
      <Text>Account -- navigate to settings</Text>
      <TouchableOpacity onPress={navigateTo}>
        <MaterialIcon name="settings" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Account;
