import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {DEFAULT_COVER, HEADER_HEIGHT} from 'src/constants';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import ProfileHeader from './ProfileHeader';
interface Props {
  scrollY: Animated.Value;
}

const ProfileCardHeader: React.FC<Props> = ({scrollY}: Props) => {
  const {
    user: {coverPhoto},
  } = useSelector(userThunkSelector);

  return (
    <View style={styles.wrapper}>
      <Animated.Image
        source={{uri: coverPhoto || DEFAULT_COVER}}
        resizeMode="cover"
        style={[styles.image, animatedImageStyle(scrollY)]}
      />
      <Animated.View style={[styles.content, animatedContentStyle(scrollY)]}>
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.1)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.45)',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,0.9)',
            'rgba(0,0,0,1)',
            'rgba(0,0,0,1)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}
        />
        <ProfileHeader />
      </Animated.View>
    </View>
  );
};

export default ProfileCardHeader;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -1000,
    paddingTop: 1000,
  },
  linearGradient: {
    height: '150%',
    width: '150%',
    position: 'absolute',
    left: -50,
    top: -50,
  },
  image: {
    height: HEADER_HEIGHT,
    width: '150%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    right: 30,
    height: 300,
  },
});

const animatedImageStyle = (scrollY: Animated.Value) => {
  return {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
        }),
      },
      {
        scale: scrollY.interpolate({
          inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          outputRange: [2, 1, 0.75],
        }),
      },
    ],
  };
};

const animatedContentStyle = (scrollY: Animated.Value) => {
  return {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 40, 215],
          outputRange: [0, 0, 240],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};
