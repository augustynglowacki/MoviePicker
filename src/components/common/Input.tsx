import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';

interface MyInputProps extends TextInputProps {
  right?: React.ReactNode;
  label: string;
  error?: string;
  left?: React.ReactNode;
  fullWidth?: boolean;
}
const Input = ({
  onChangeText,
  style,
  value,
  label,
  error,
  right,
  left,
  clearButtonMode,
  secureTextEntry = false,
  fullWidth = false,
  autoFocus = false,
  autoCapitalize = 'none', //if u want input with automatic capital letter use autoCapitalize = 'words',
}: MyInputProps) => {
  const getWidth = () => {
    return {width: fullWidth ? '100%' : '80%'};
  };
  return (
    <View style={styles.wrap}>
      <TextInput
        style={[styles.textInput, getWidth(), style]}
        onChangeText={onChangeText}
        value={value}
        theme={{
          colors: {
            primary: colors.primary,
            text: colors.white,
            placeholder: colors.grey,
          },
        }}
        placeholderTextColor={colors.white}
        label={label}
        right={right}
        left={left}
        secureTextEntry={secureTextEntry}
        clearButtonMode={clearButtonMode}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
  },
  wrap: {
    marginBottom: 12,
  },
  error: {
    alignSelf: 'center',
    width: '80%',
    color: colors.danger,
    fontSize: 12,
    marginTop: 1,
  },
});
