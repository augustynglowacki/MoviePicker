import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../../assets/theme/colors';

type TitleProps = {
  title: string;
};

const Header = ({title}: TitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default Header;

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
});
