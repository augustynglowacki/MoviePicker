import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../atoms/Input';

interface SettingBoxProps {
  label: string;
  startingValue: string;
  hidePassword?: boolean;
}

const SettingBox: React.FC<SettingBoxProps> = ({
  label,
  startingValue,
  hidePassword,
}) => {
  const [text, setText] = useState(startingValue);

  return (
    <View style={styles.settingBox}>
      <Input
        label={label}
        onChangeText={valueText => setText(valueText)}
        value={text}
        hidePassword={hidePassword}
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
