import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import MovieBox from '../atoms/MovieBox';
import SearchErrorBox from '../atoms/SearchErrorBox';
import SectionHeader from '../atoms/SectionHeader';

interface DiscoveryContentBoxProps {
  title: string;
  data: Movie[];
  error: string;
  loading: boolean;
}

const renderItem: ListRenderItem<Movie> = ({item}) => (
  <MovieBox poster_path={item.poster_path} />
);

const DiscoveryContentBox = ({
  title,
  data,
  error,
}: DiscoveryContentBoxProps) => {
  return (
    <View style={styles.discoveryContentBox}>
      <SectionHeader text={title} size={20} color={colors.white} />
      <SearchErrorBox error={error} loading={false}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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

export default DiscoveryContentBox;
