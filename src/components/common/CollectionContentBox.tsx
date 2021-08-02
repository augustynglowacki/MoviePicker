import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MovieBox, ErrorWrapper, SectionHeader} from '.';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';

interface CollectionContentBoxProps {
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
  loading,
}: CollectionContentBoxProps) => {
  return (
    <View style={styles.discoveryContentBox}>
      {data.length === 0 ? null : (
        <SectionHeader text={title} size={20} color={colors.white} />
      )}
      <ErrorWrapper error={error} loading={loading}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={10}
        />
      </ErrorWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  discoveryContentBox: {
    marginTop: 20,
  },
});

export default CollectionContentBox;
