import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
interface Props {
  value: number;
  label: string;
  icon: string;
  loading: boolean;
}

const StatsBox: React.FC<Props> = ({value, label, icon, loading}) => {
  const [showStats, setShowStats] = useState(false);
  const prevSpinnerState = useRef(loading);
  useEffect(() => {
    if (prevSpinnerState.current && !loading) {
      setShowStats(true);
    }
    if (loading) {
      setShowStats(false);
    }
    prevSpinnerState.current = loading;
  }, [loading]);

  return (
    <View style={styles.statsBox}>
      <View style={styles.wrapper}>
        {showStats ? (
          <Text style={[styles.text, styles.numberText]}>{value}</Text>
        ) : (
          <ActivityIndicator animating={true} color={palette.white} size={30} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.text, styles.subText]}>{label}</Text>
        <Icon
          name={icon}
          type={IconTypes.IONICON}
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
  wrapper: {
    height: 32,
  },
});

export default StatsBox;
