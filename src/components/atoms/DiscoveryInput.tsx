import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {setQuery} from '../../redux/search/SearchSlice';

const DiscoveryInput = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.inputBox}>
      <Icon name="search" style={styles.inputIcon} />
      <TextInput
        placeholder="Search for movies"
        style={styles.discoveryInput}
        keyboardAppearance="light"
        clearButtonMode="always"
        onChangeText={text => dispatch(setQuery(text))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
  },
  discoveryInput: {
    width: '90%',
    height: 30,
    padding: 4,
    color: colors.white,
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: colors.grey,
  },
  inputIcon: {
    padding: 8,

    borderWidth: 1,
    backgroundColor: colors.grey,
  },
});

export default DiscoveryInput;
