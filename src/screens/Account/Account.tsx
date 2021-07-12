import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const Account = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      <Text>Account -- navigate to settings</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('Settings');
        }}>
        <MaterialIcon name="settings" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
export default Account;
