import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BackgroundGradient: React.FC = () => (
  <View style={styles.linearWrapper}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['transparent', '#000']}
      style={styles.linearGradient}
    />
  </View>
);

const styles = StyleSheet.create({
  linearWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGradient: {
    width: '100%',
    height: 180,
    position: 'absolute',
  },
});

export default BackgroundGradient;
