import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {setQuery} from '../../redux/search/SearchSlice';
import Input from './Input';

const DiscoveryInput = () => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  return (
    <Input
      label={i18n.t('movies:searchPlaceholder')}
      onChangeText={text => dispatch(setQuery(text))}
      secureTextEntry={true}
      left={<TextInput.Icon name="magnify" color={colors.grey} />}
      fullWidth
      clear="always"
      autoFocus
    />
  );
};

export default DiscoveryInput;
