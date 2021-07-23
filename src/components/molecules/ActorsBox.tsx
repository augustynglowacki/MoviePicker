import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {Actor} from '../../models';

import ActorBox from '../atoms/ActorBox';
import SearchErrorBox from '../atoms/SearchErrorBox';
import SectionHeader from '../atoms/SectionHeader';

interface ActorsBoxProps {
  data: Actor[];
  error: string;
}

const renderItem: ListRenderItem<Actor> = ({item}) => (
  <ActorBox name={item.name} profile_path={item.profile_path} />
);

const ActorsBox = ({data, error}: ActorsBoxProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.actorsBox}>
      {data.length === 0 ? null : (
        <SectionHeader
          text={t('movies: actors')}
          color={colors.white}
          size={20}
        />
      )}
      <SearchErrorBox error={error} loading={false}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </SearchErrorBox>
    </View>
  );
};

const styles = StyleSheet.create({
  actorsBox: {
    marginTop: 20,
  },
});

export default ActorsBox;
