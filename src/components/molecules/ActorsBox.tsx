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
  <View>
    <ActorBox name={item.name} profile_path={item.profile_path} />
  </View>
);

const ActorsBox = ({data, error}: ActorsBoxProps) => {
  const {i18n} = useTranslation();
  return (
    <View style={styles.actorsBox}>
      {data.length === 0 ? null : (
        <SectionHeader
          text={i18n.t('movies: actors')}
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
