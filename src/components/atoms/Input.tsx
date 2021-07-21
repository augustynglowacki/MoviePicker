/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';

interface MyInputProps extends TextInputProps {
  right?: React.ReactNode;
  label: string;
  error?: any;
  left?: React.ReactNode;
  fullWidth?: boolean;
  hidePassword?: boolean;
  clear?: 'never' | 'while-editing' | 'unless-editing' | 'always' | undefined;
}
const Input = ({
  onChangeText,
  style,
  value,
  label,
  error,
  right,
  left,
  clear,
  hidePassword = false,
  fullWidth = false,
}: MyInputProps) => {
  const getWidth = () => {
    return {width: fullWidth ? '100%' : '80%'};
  };
  return (
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
      secureTextEntry={hidePassword}
      clearButtonMode={clear}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    marginBottom: 12,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
  },
});
