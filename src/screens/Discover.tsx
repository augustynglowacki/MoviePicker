import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import DiscoverySection from '../components/organisms/DiscoverySection';

const Discover = () => {
  return (
    <ScrollView style={styles.wrapper}>
      <DiscoverySection />
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
});
