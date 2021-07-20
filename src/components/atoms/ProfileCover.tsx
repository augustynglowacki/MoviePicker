import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ContainerProps {
  img: any;
}

const ProfileCover: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  img,
}) => {
  return (
    <ImageBackground source={img} style={styles.coverPhoto}>
      <LinearGradient
        colors={['#050404b2', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradient}>
        {children}
      </LinearGradient>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  coverPhoto: {
    backgroundColor: 'red',
  },
  linearGradient: {
    paddingBottom: 50,
  },
});

export default ProfileCover;