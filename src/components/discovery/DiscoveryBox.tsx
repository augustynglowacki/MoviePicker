import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import DiscoveryInput from './DiscoveryInput';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import ScreenHeader from '../common/ScreenHeader';

const DiscoveryBox: React.FC = () => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.searchBox}>
      <Animated.View entering={FlipInXDown.springify().delay(300)}>
        <ScreenHeader label={t('search')} />
      </Animated.View>
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
