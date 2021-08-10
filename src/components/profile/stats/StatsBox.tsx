import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
interface Props {
  value: number;
  label: string;
  icon: string;
}

const StatsBox: React.FC<Props> = ({value, label, icon}) => {
  return (
    <View style={styles.statsBox}>
      <Text style={[styles.text, styles.numberText]}>{value}</Text>
      <View style={styles.content}>
        <Text style={[styles.text, styles.subText]}>{label}</Text>
        <Icon
          name={icon}
          type={IconTypes.ANT}
          color={palette.primary}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: palette.white,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white,
  },
  numberText: {
    fontSize: 24,
  },
  subText: {
    fontSize: 12,
    color: palette.primary,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
    color: palette.white,
  },
  icon: {
    marginLeft: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StatsBox;
