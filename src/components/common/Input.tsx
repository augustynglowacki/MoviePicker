import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputProps} from 'react-native';
import {TextInput} from 'react-native-paper';
import palette from 'src/styles/palette';

interface Props extends TextInputProps {
  right?: React.ReactNode;
  label: string;
  error?: string;
  left?: React.ReactNode;
  fullWidth?: boolean;
}
const Input: React.FC<Props> = ({
  onChangeText,
  style,
  value,
  label,
  error,
  right,
  left,
  editable,
  clearButtonMode,
  secureTextEntry,
  fullWidth,
  autoFocus,
  autoCapitalize = 'none', //if u want input with automatic capital letter use autoCapitalize = 'words',
}) => {
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
            primary: palette.primary,
            text: palette.white,
            placeholder: palette.grey,
          },
        }}
        placeholderTextColor={palette.white}
        label={label}
        right={right}
        left={left}
        secureTextEntry={secureTextEntry}
        clearButtonMode={clearButtonMode}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        editable={editable}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: palette.darkGrey,
    borderRadius: 4,
  },
  wrap: {
    marginBottom: 12,
  },
  error: {
    alignSelf: 'center',
    width: '80%',
    color: palette.danger,
    fontSize: 12,
    marginTop: 1,
  },
});
