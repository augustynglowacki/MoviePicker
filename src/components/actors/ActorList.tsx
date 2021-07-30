import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Actor} from 'src/models';
import palette from 'src/styles/palette';
import {SearchErrorBox, SectionHeader} from '../common';
import ActorItem from './ActorItem';

interface ActorListProps {
  data: Actor[];
  error?: string;
}

const renderItem: ListRenderItem<Actor> = ({item}) => (
  <ActorItem name={item.name} profile_path={item.profile_path} />
);

const ActorList = ({data, error}: ActorListProps) => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.ActorList}>
      {!!data.length && (
        <SectionHeader
          text={t('movies:actors')}
          color={palette.white}
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
  ActorList: {
    marginTop: 20,
  },
});

export default ActorList;
