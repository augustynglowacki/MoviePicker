import React, {useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Loading = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.spring(rotateAnim, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loadingBox}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Icon name="loading1" size={100} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    flex: 1,
  },
});

export default Loading;
