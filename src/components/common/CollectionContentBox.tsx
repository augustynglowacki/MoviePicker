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

const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const CollectionContentBox: React.FC<Props> = ({title, data, error}) => {
  return (
    <View style={styles.discoveryContentBox}>
      {data.length === 0 ? null : (
        <SectionHeader text={title} size={20} color={palette.white} />
      )}
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
