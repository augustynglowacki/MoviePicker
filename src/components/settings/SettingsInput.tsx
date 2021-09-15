import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'src/components/common';

interface Props {
  label: string;
  initialValue: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
  error?: string;
  autoFocus?: boolean;
  editable?: boolean;
}

const SettingInput: React.FC<Props> = ({
  label,
  initialValue,
  secureTextEntry,
  onChange,
  error,
  autoFocus,
  editable,
}) => {
  return (
    <View style={styles.settingInput}>
      <Input
        autoFocus={autoFocus}
        error={error}
        label={label}
        value={initialValue}
        secureTextEntry={secureTextEntry}
        onChangeText={valueText => {
          onChange(valueText);
        }}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingInput: {
    borderColor: 'white',
  },
});

export default SettingInput;
