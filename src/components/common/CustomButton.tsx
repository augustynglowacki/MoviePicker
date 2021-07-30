import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import colors from '../../assets/theme/colors';

interface MyButtonProps {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  width?: 'small' | 'medium';
  onPress: () => void;
}

const CustomButton = ({
  disabled,
  loading,
  label,
  variant,
  width,
  onPress,
}: MyButtonProps) => {
  //background color based on variant
  const getBackgroundColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (variant === 'primary') {
      return colors.primary;
    }
    if (variant === 'secondary') {
      return colors.darkGrey;
    }
  };
  //label color based on variant
  const getColor = () => {
    if (variant === 'secondary') {
      return colors.primary;
    }
    return colors.darkGrey;
  };
  //button width based on variant
  const getWidth = () => {
    if (width === 'small') {
      return '45%';
    }
    if (width === 'medium') {
      return '60%';
    }
    return '70%';
  };
  return (
    <Button
      mode="contained"
      disabled={disabled}
      loading={loading}
      onPress={onPress}
      style={[
        styles.wrapper,
        {backgroundColor: getBackgroundColor()},
        {width: getWidth()},
      ]}
      labelStyle={[styles.text, {color: getColor()}]}
      theme={{
        colors: {
          text: 'black',
        },
      }}>
      {label}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  wrapper: {
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
