import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MovieBox, SearchErrorBox, SectionHeader} from '.';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';

interface DiscoveryContentBoxProps {
  title: string;
  data: Movie[];
  error: string;
  loading: boolean;
}

const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const CollectionContentBox = ({
  title,
  data,
  error,
}: DiscoveryContentBoxProps) => {
  return (
    <View style={styles.discoveryContentBox}>
      {data.length === 0 ? null : (
        <SectionHeader text={title} size={20} color={colors.white} />
      )}
      <SearchErrorBox error={error} loading={false}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={5}
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
