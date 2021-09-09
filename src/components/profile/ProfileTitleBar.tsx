import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {DEFAULT_AVATAR, HEADER_HEIGHT, IconTypes} from 'src/constants';
import {Text} from 'react-native';
import {HeaderBar} from 'src/components/common';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {Avatar} from 'src/components/common';

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
    user: {userName, avatar},
  } = useSelector(userThunkSelector);

  return (
    <SafeAreaView style={styles.headerBar}>
      <Animated.View style={[styles.overlay, animatedStyle(scrollY)]}>
        <SafeAreaView style={styles.content}>
          <Avatar
            source={avatar || DEFAULT_AVATAR}
            onPress={() => {}}
            isSmall
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
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProfileTitleBar;
