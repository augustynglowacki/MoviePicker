import React, {useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../assets/theme/colors';
import Container from '../components/common/Container';

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
    <Container>
      <View style={styles.loadingBox}>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Icon name="loading1" size={100} color={colors.primary} />
        </Animated.View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    position: 'absolute',
    flex: 1,
  },
});

export default Loading;
