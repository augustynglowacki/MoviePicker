import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import palette from 'src/styles/palette';
interface SocilaButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

const SocialButton = ({onPress, icon}: SocilaButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Image style={styles.image} source={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: palette.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
