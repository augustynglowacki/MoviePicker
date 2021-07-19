import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionHeader from '../atoms/SectionHeader';
import DiscoveryInput from '../atoms/DiscoveryInput';

const SearchBox = () => {
  return (
    <View style={styles.searchBox}>
      <SectionHeader text="Search" color="white" />
      <DiscoveryInput />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 50, // temporary
  },
});

export default SearchBox;
