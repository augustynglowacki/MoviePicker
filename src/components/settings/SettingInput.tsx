import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '../common';

interface Props {
  label: string;
  initialValue: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
  error?: string;
}

const SettingInput: React.FC<Props> = ({
  label,
  initialValue,
  secureTextEntry,
  onChange,
  error,
}) => {
  return (
    <View style={styles.settingInput}>
      <Input
        error={error}
        label={label}
        value={initialValue}
        secureTextEntry={secureTextEntry}
        onChangeText={valueText => {
          onChange(valueText);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingInput: {
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});

export default SettingInput;
