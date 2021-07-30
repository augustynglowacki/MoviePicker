import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import palette from 'src/styles/palette';
import {setQuery} from 'src/redux/search/SearchSlice';
import {Input} from '../common';

const DiscoveryInput = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation('movies');
  return (
    <Input
      label={t('searchPlaceholder')}
      onChangeText={text => dispatch(setQuery(text))}
      left={<TextInput.Icon name="magnify" color={palette.grey} />}
      fullWidth
      clearButtonMode="always"
      autoFocus
      autoCapitalize="words"
    />
  );
};

export default DiscoveryInput;
