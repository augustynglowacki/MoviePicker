import React from 'react';
import {Text, StyleSheet} from 'react-native';

// We can use this component as a header for our screens

interface Props {
  text: string;
  color?: string;
  size?: number;
  center?: boolean;
}

const SectionHeader: React.FC<Props> = ({text, color, size, center}) => (
  <Text
    style={[
      styles.sectionHeader,
      {
        color: color,
        fontSize: size || 36,
        textAlign: center ? 'center' : 'left',
      },
    ]}>
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
