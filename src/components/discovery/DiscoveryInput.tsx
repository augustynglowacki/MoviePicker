import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import palette from 'src/styles/palette';
import {setQuery} from 'src/redux/search/SearchSlice';
import {Input} from '../common';
import {debounce} from 'lodash';
import {StyleSheet} from 'react-native';

const DiscoveryInput: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation('movies');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setQueryWithDelay = useCallback(
    debounce(text => dispatch(setQuery(text)), 400),
    [],
  );
  return (
    <Input
      label={t('searchPlaceholder')}
      onChangeText={text => setQueryWithDelay(text)}
      left={<TextInput.Icon name="magnify" color={palette.grey} />}
      fullWidth
      clearButtonMode="always"
      autoFocus
      autoCapitalize="words"
      style={styles.text}
    />
  );
};

export default DiscoveryInput;

const styles = StyleSheet.create({
  text: {
    backgroundColor: palette.black,
  },
});
