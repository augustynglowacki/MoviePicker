import React from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import palette from 'src/styles/palette';
import {Movie} from 'src/models';
import ErrorWrapper from '../error/ErrorWrapper';
import CollectionItem from './CollectionItem';
import SectionHeader from '../common/SectionHeader';
import Container from '../common/Container';

interface Props {
  title: string;
  data: Movie[];
  error?: string;
  loading: boolean;
  isExplore?: boolean;
}

const Collection: React.FC<Props> = ({title, data, error, isExplore}) => {
  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <CollectionItem movie={item} />
  );
  if (error) {
    return <ErrorWrapper error={error} loading={false} />;
  }
  if (!data.length) {
    return null;
  }
  return (
    <Container padding="small" disableSafeArea style={styles.wrapper}>
      <SectionHeader text={title} size={20} color={palette.white} />
      <FlatList
        scrollEnabled={!isExplore}
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
});

export default Collection;
