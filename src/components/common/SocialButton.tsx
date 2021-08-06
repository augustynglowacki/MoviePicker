import React from 'react';
import {GestureResponderEvent, ImageSourcePropType} from 'react-native';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import palette from 'src/styles/palette';
interface Props {
  icon: ImageSourcePropType;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const SocialButton: React.FC<Props> = ({onPress, icon}) => {
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
    marginLeft: 12,
  },
  image: {
    width: 30,
    height: 30,
  },
});
