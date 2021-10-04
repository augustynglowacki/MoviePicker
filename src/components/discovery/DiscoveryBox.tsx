import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import DiscoveryInput from './DiscoveryInput';
import ScreenHeader from '../common/ScreenHeader';

const DiscoveryBox: React.FC = () => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.searchBox}>
      <ScreenHeader label={t('search')} />
      <DiscoveryInput />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
});

export default DiscoveryBox;
