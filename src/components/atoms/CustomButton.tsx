import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import colors from '../../assets/theme/colors';

interface MyButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  width?: 'small' | 'medium';
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
    return '100%';
  };
  // additional padding when loading gets returned from state
  const getLoadingPadding = () => {
    return loading ? 5 : 0;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.wrapper,
        {backgroundColor: getBackgroundColor()},
        {width: getWidth()},
      ]}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator color={getColor()} style={styles.loader} />
        )}
        {label && (
          <Text
            style={[
              styles.text,
              {color: getColor()},
              {paddingHorizontal: getLoadingPadding()},
            ]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 3,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  text: {
    paddingVertical: 13,
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loader: {
    paddingHorizontal: 5,
  },
  loaderSection: {
    flexDirection: 'row',
  },
});
