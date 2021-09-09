import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
import palette from 'src/styles/palette';
interface Props {
  value: number;
  label: string;
  icon: string;
}

const StatsBox: React.FC<Props> = ({value, label, icon}) => {
  const {loading} = useSelector(collectionsSelector);
  const [showStats, setShowStats] = useState(false);
  const prevSpinnerState = useRef(loading);

  useFocusEffect(
    React.useCallback(() => {
      return () => setShowStats(false);
    }, []),
  );
  useEffect(() => {
    if (prevSpinnerState.current && !loading) {
      setShowStats(true);
    }
    if (loading) {
      setShowStats(false);
    }
    prevSpinnerState.current = loading;
  }, [loading]);

  const getLoader = () => {
    if (!showStats) {
      return (
        <ActivityIndicator
          animating={true}
          color="rgba(255,255,255,0.95)"
          size={30}
        />
      );
    }
    if (showStats) {
      return <Text style={[styles.text, styles.numberText]}>{value}</Text>;
    }
  };

  return (
    <View style={styles.statsBox}>
      <View style={styles.wrapper}>{getLoader()}</View>

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
    height: 34,
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default StatsBox;
