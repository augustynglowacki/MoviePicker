import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Button} from 'react-native-paper';
import palette from 'src/styles/palette';

interface Props {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  width?: 'small' | 'medium';
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({
  disabled,
  loading,
  label,
  variant = 'primary',
  width,
  onPress,
}) => {
  const isPrimary = variant === 'primary';
  const {primary, darkGrey} = palette;

  const getColor = (): StyleProp<TextStyle> => {
    return {color: isPrimary ? primary : darkGrey};
  };
  const getBackground = (): StyleProp<ViewStyle> => {
    return {backgroundColor: isPrimary ? darkGrey : primary};
  };

  const getWidth = (): StyleProp<FlexStyle> => {
    switch (width) {
      case 'small': {
        return {width: '45%'};
      }
      case 'medium': {
        return {width: '60%'};
      }
      default:
        return {width: '70%'};
    }
  };

  return (
    <Button
      mode="contained"
      disabled={disabled}
      loading={loading}
      onPress={onPress}
      style={[styles.background, getBackground(), getWidth()]}
      labelStyle={[styles.text, getColor()]}>
      {label}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  background: {
    borderRadius: 16,
    marginVertical: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    paddingVertical: 3,
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
