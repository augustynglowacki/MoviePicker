import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from 'src/components/common';

interface Props {
  title: string;
  subtitle: string;
  icon?: string;
  onPress: () => void;
}

const SettingsOptionBox: React.FC<Props> = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.optionBox}>
        {!!icon && (
          <View>
            <Icon
              type={IconTypes.IONICON}
              color={palette.white}
              name={icon}
              size={21}
              style={styles.icon}
            />
          </View>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    height: 50,
    backgroundColor: palette.black,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    marginBottom: 2,
  },
  title: {
    color: palette.white,
  },
  subtext: {
    color: '#ffffffa0',
    fontSize: 10,
  },
  icon: {
    marginRight: 15,
  },
});

export default SettingsOptionBox;
