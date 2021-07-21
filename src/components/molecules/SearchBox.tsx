import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionHeader from '../atoms/SectionHeader';
import DiscoveryInput from '../atoms/DiscoveryInput';
import colors from '../../assets/theme/colors';
import {useTranslation} from 'react-i18next';

const SearchBox = () => {
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

export default SearchBox;
