import React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import palette from 'src/styles/palette';
import {HEADER_HEIGHT, IconTypes} from 'src/constants';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {HeaderBar} from 'src/components/common';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  scrollY: Animated.Value;
  navigateToSettings: () => void;
  logOut: () => void;
}

const ProfileTitleBar: React.FC<Props> = ({
  scrollY,
  navigateToSettings,
  logOut,
}) => {
  const {
    user: {userName},
  } = useSelector(userThunkSelector);
  //TODO: photoURI from selector
  const placeholder =
    'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2';
  const photoURI = auth().currentUser?.photoURL;

  return (
    <SafeAreaView style={styles.headerBar}>
      <Animated.View style={[styles.overlay, animatedStyle(scrollY)]}>
        <SafeAreaView style={styles.content}>
          <Image
            source={{
              uri: photoURI || placeholder,
            }}
            style={styles.avatar}
          />
          <Text style={styles.text}>{userName}</Text>
        </SafeAreaView>
      </Animated.View>
      <HeaderBar
        leftIcon={{
          type: IconTypes.IONICON,
          name: 'ios-log-out-outline',
          onPressFunction: logOut,
        }}
        rightIcon={{
          type: IconTypes.IONICON,
          name: 'ios-settings-outline',
          onPressFunction: navigateToSettings,
        }}
      />
    </SafeAreaView>
  );
};

const animatedStyle = (scrollY: Animated.Value) => {
  return {
    opacity: scrollY.interpolate({
      inputRange: [HEADER_HEIGHT - 95, HEADER_HEIGHT - 75],
      outputRange: [0, 1],
    }),
  };
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.strongBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
    color: palette.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: 'center',
  },
  text: {
    color: palette.white,
    fontWeight: 'bold',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProfileTitleBar;
