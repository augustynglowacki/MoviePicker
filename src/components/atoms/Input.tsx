import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {TextInputProps} from 'react-native';
import colors from '../../assets/theme/colors';

interface MyInputProps extends TextInputProps {
  iconPosition?: string;
  icon?: any;
  label: string;
  error?: any;
}

const Input = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label,
  error,
  ...props
}: MyInputProps) => {
  const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition === 'left') {
      return 'row';
    }
    return 'row-reverse';
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }
    if (focused) {
      return colors.primary;
    }
    return colors.grey;
  };

  const handleFocus = () => setFocused(currState => !currState);
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          // {alignItems: icon ? 'center' : 'baseline'},
          {
            borderColor: getBorderColor(),
            flexDirection: getFlexDirection(),
          },
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={handleFocus}
          onBlur={handleFocus}
          placeholderTextColor={colors.grey}
          //pasword font glitch fix
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: 'Roboto'}})
          }
          {...props}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 4,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  label: {
    alignSelf: 'center',
    width: '80%',
    color: colors.white,
  },
  inputContainer: {
    paddingTop: 12,
    paddingBottom: 2,
  },
  textInput: {
    flex: 1,
    width: '100%',
    color: colors.white,
  },
  error: {
    alignSelf: 'center',
    width: '80%',
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});
