import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Home = () => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Details');
      }}
      style={styles.wrapper}>
      <Text>HomeScreen</Text>
    </TouchableOpacity>
  );
};

export default Home;

//temporary styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});
