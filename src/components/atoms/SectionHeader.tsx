import React from 'react';
import {Text, StyleSheet} from 'react-native';

// We can use this component as a header for our screens

interface ISectionHeaderProps {
  text: string;
}

const SectionHeader = ({text}: ISectionHeaderProps) => (
  <Text style={styles.sectionHeader}>{text}</Text>
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default SectionHeader;
