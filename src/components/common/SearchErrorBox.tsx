import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from 'src/styles/palette';

interface SearchErrorBoxProps {
  loading: boolean;
  error?: string;
}

const SearchErrorBox: React.FC<PropsWithChildren<SearchErrorBoxProps>> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return (
      //TODO: use ErrorBox, duplicated component
      <View style={styles.searchErrorBox}>
        <Icon name="times-circle-o" color={palette.danger} size={50} />
        <Text style={{color: palette.danger}}>{error}</Text>
      </View>
    );
  }
  return <>{children}</>;
};

const styles = StyleSheet.create({
  searchErrorBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchErrorBox;
