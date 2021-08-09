import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {Actor} from 'src/models';
import palette from 'src/styles/palette';
import {Container, ErrorWrapper, SectionHeader} from '../common';
import ActorItem from './ActorItem';

interface Props {
  data: Actor[];
  error?: string;
}

const Actors: React.FC<Props> = ({data, error}) => {
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
    <Container padding="small" disableSafeArea style={styles.Actors}>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  Actors: {
    marginTop: 20,
  },
});

export default Actors;
