import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

interface DiscoveryContentBoxProps {
  title: string;
  data: Movie[];
}

const renderItem: ListRenderItem<Movie> = ({item}) => (
  <MovieBox title={item.title} poster_path={item.poster_path} />
);

const DiscoveryContentBox = ({title, data}: DiscoveryContentBoxProps) => {
  return (
    <View style={styles.discoveryContentBox}>
      <SectionHeader text={title} size={20} color={colors.white} />
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  discoveryContentBox: {
    marginTop: 20,
  },
});

export default DiscoveryContentBox;
