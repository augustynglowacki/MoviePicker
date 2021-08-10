import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionHeader from '../common/SectionHeader';
import palette from 'src/styles/palette';
import {useTranslation} from 'react-i18next';
import DiscoveryInput from './DiscoveryInput';

const DiscoveryBox: React.FC = () => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.searchBox}>
      <SectionHeader text={t('search')} color={palette.white} />
      <DiscoveryInput />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    justifyContent: 'space-around',
    padding: 6,
  },
});

export default DiscoveryBox;
