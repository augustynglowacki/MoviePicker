import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '../common';

interface SettingBoxProps {
  label: string;
  startingValue?: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
  error: any;
}

const SettingBox: React.FC<SettingBoxProps> = ({
  label,
  startingValue,
  secureTextEntry,
  onChange,
  error,
}) => {
  const [text, setText] = useState(startingValue);
  // is this correct name? Shouldn't be StyledInput or smth ?
  return (
    <View style={styles.settingBox}>
      <Input
        error={error}
        label={label}
        onChangeText={valueText => {
          setText(valueText);
          onChange(valueText);
        }}
        value={text}
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

export default SettingBox;
