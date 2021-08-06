import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Actor} from 'src/models';
import palette from 'src/styles/palette';
import {ErrorWrapper, SectionHeader} from '../common';
import ActorItem from './ActorItem';

interface Props {
  data: Actor[];
  error?: string;
}

const ActorList: React.FC<Props> = ({data, error}) => {
  const {t} = useTranslation('movies');
  const renderItem: ListRenderItem<Actor> = ({item}) => (
    <ActorItem name={item.name} profilePath={item.profilePath} />
  );

  if (error) {
    return <ErrorWrapper error={error} loading={false} />;
  }
  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.ActorList}>
      <SectionHeader
        text={t('movies:actors')}
        color={palette.white}
        size={20}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ActorList: {
    marginTop: 20,
  },
});

export default ActorList;
