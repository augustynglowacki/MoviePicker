import React from 'react';
import {Text, StyleSheet} from 'react-native';

// We can use this component as a header for our screens

interface ISectionHeaderProps {
  text: string;
  color?: string;
  size?: number;
}

const SectionHeader = ({text, color, size}: ISectionHeaderProps) => (
  <Text style={[styles.sectionHeader, {color: color, fontSize: size || 36}]}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: '300',
    marginBottom: 5,
  },
});
export default SectionHeader;
