import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';

const Home = () => {
  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false;

  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate('Details');
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={() => {
          isLogIn
            ? console.log('add function to like')
            : Alert.alert(
                'Login! ',
                'Do you want to login to add to favorite?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigate('Auth');
                    },
                  },
                ],
              );
        }}>
        <View style={styles.wrapper}>
          <Text>HomeScreen</Text>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
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
