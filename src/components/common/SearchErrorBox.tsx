import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/theme/colors';

interface Props {
  loading: boolean;
  error: string;
}

const SearchErrorBox: React.FC<Props> = ({loading, error, children}) => {
  // shouldn't it be more generic component? Or maybe this should be implemented in some kind of ListComponent which will contain FlatList and this loading/error handler ?
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // shouldn't return ErrorBox?
  if (error) {
    <View style={styles.searchErrorBox}>
      <Icon name="times-circle-o" color={colors.danger} size={50} />
      <Text style={{color: colors.danger}}>{error}</Text>
    </View>;
  }

  return <View>{children}</View>;
};

const styles = StyleSheet.create({
  searchErrorBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchErrorBox;
