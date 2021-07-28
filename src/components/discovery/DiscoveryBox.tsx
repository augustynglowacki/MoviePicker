import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionHeader from '../common/SectionHeader';
import colors from '../../assets/theme/colors';
import {useTranslation} from 'react-i18next';
import DiscoveryInput from './DiscoveryInput';

const DiscoveryBox = () => {
  const {i18n} = useTranslation();
  return (
    <View style={styles.searchBox}>
      <SectionHeader text={i18n.t('movies:search')} color={colors.white} />
      <DiscoveryInput />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default DiscoveryBox;
