import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {Actor} from '../../models';
import {ErrorWrapper, SectionHeader} from '../common';
import ActorBox from './ActorItem';

interface Props {
  data: Actor[];
  error: string;
}

const renderItem: ListRenderItem<Actor> = ({item}) => (
  <View>
    <ActorBox name={item.name} profile_path={item.profile_path} />
  </View>
);

const ActorsBox: React.FC<Props> = ({data, error}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.actorsBox}>
      {data.length === 0 ? null : (
        <SectionHeader
          text={t('movies:actors')}
          color={colors.white}
          size={20}
        />
      )}
      <ErrorWrapper error={error} loading={false}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </ErrorWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  actorsBox: {
    marginTop: 20,
  },
});

export default ActorsBox;
