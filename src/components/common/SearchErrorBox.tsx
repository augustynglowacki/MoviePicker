import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from 'src/styles/palette';

interface Props {
  loading: boolean;
  error?: string;
}
//TODO: MP-014 Remove ErrorBox & SearchErrorBox & ScreenWrapper duplicate code

const SearchErrorBox: React.FC<Props> = ({loading, error, children}) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return (
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
