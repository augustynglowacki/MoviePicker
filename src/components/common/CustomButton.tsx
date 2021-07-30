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
  // u should set default colors/styles for primary property in StyleSheet
  // and then use in style={} smth like that
  // !isPrimary && styles.secondaryText
  const isPrimary = variant === 'primary';

  const getBackgroundColor = () => {
    if (disabled) {
      return colors.grey;
    }
    return isPrimary ? colors.primary : colors.darkGrey;
  };

  const getColor = () => {
    if (!isPrimary) {
      // this is interesting
      return colors.primary;
    }
    return colors.darkGrey;
  };

  const getWidth = () => {
    //switch case is more readable
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
