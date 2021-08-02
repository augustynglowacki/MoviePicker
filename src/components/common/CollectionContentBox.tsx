import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MovieBox, SearchErrorBox, SectionHeader} from '.';
import palette from 'src/styles/palette';
import {Movie} from 'src/models';

interface Props {
  title: string;
  data: Movie[];
  error?: string;
  loading: boolean;
}

const CollectionContentBox: React.FC<Props> = ({title, data, error}) => {
  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <MovieBox movie={item} />
  );
  if (!data.length) {
    return null;
  }
  return (
    <View style={styles.discoveryContentBox}>
      <SectionHeader text={title} size={20} color={palette.white} />
      <SearchErrorBox error={error} loading={false}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={10}
        />
      </SearchErrorBox>
    </View>
  );
};

const styles = StyleSheet.create({
  discoveryContentBox: {
    marginTop: 20,
  },
});

export default CollectionContentBox;
