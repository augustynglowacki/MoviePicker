import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '../common';

interface Props {
  label: string;
  initialValue: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
  error: any;
}

const SettingInput: React.FC<Props> = ({
  label,
  initialValue,
  secureTextEntry,
  onChange,
  error,
}) => {
  return (
    <View style={styles.settingBox}>
      <Input
        error={error}
        label={label}
        onChangeText={valueText => {
          onChange(valueText);
        }}
        value={initialValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingBox: {
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  settingText: {
    color: 'white',
  },
});

export default SettingInput;
