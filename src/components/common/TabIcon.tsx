import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import palette from 'src/styles/palette';

const TabIcon = (focused: boolean, name: string) => {
  return <MaterialIcon style={styles(focused).icon} name={name} size={26} />;
};

export default TabIcon;

const styles = (focused?: boolean) =>
  StyleSheet.create({
    icon: {
      color: focused ? palette.primary : palette.white,
      transform: focused ? [{scale: 1.2}] : [{scale: 1}],
    },
  });
