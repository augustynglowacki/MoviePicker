import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../assets/theme/colors';
import {setQuery} from '../../redux/search/SearchSlice';
import {Input} from '../common';

const DiscoveryInput = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  return (
    <Input
      label={t('movies:searchPlaceholder')}
      onChangeText={text => dispatch(setQuery(text))}
      left={<TextInput.Icon name="magnify" color={colors.grey} />}
      fullWidth
      clearButtonMode="always"
      autoFocus
      autoCapitalize="words"
    />
  );
};

export default DiscoveryInput;
