import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionHeader from '../atoms/SectionHeader';
import DiscoveryInput from '../atoms/DiscoveryInput';
import colors from '../../assets/theme/colors';

const SearchBox = () => {
  return (
    <View style={styles.searchBox}>
      <SectionHeader text="Search" color={colors.white} />
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
