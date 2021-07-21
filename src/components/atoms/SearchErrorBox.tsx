import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/theme/colors';

interface SearchErrorBoxProps {
  loading: boolean;
  error: string;
  children: React.ReactNode;
}

const SearchErrorBox = ({loading, error, children}: SearchErrorBoxProps) => {
  return (
    <View>
      {/* to do: loading */}
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <View style={styles.searchErrorBox}>
          <Icon name="times-circle-o" color={colors.danger} size={50} />
          <Text style={{color: colors.danger}}>{error}</Text>
        </View>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchErrorBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchErrorBox;
