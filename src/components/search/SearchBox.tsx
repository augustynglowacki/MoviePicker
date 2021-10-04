import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ScreenHeader from '../common/ScreenHeader';
import palette from 'src/styles/palette';
import {Input} from '../common';
import {useDispatch} from 'react-redux';
import {setQuery} from 'src/redux/search/SearchSlice';
import {debounce} from 'lodash';

const SearchBox: React.FC = () => {
  const {t} = useTranslation('movies');
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setQueryWithDelay = useCallback(
    debounce(text => dispatch(setQuery(text)), 400),
    [],
  );
  return (
    <View style={styles.searchBox}>
      <ScreenHeader label={t('search')} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  text: {
    backgroundColor: palette.black,
  },
});

export default SearchBox;
