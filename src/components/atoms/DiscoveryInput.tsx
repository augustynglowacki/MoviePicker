import React from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {setQuery} from '../../redux/search/SearchSlice';
import Input from './Input';

const DiscoveryInput = () => {
  const dispatch = useDispatch();
  return (
    <Input
      label="What's on your mind?"
      onChangeText={text => dispatch(setQuery(text))}
      secureTextEntry={true}
      left={<TextInput.Icon name="magnify" color={colors.grey} />}
      fullWidth
      clearButtonMode="always" //For iOS, it will give the default clear text button.
    />
  );
};

export default DiscoveryInput;
