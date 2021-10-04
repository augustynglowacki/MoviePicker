import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {BOTTOM_TABS_HEIGHT, WINDOW_WIDTH} from 'src/constants';
import {Popular} from 'src/models';
import {getPopular} from 'src/redux/popular/PopularActions';
import {popularSelector} from 'src/redux/popular/PopularSlice';
import palette from 'src/styles/palette';
import {Container, Loading} from '../common';
import PopularItem from './PopularItem';

interface Props {
  movies: Popular[];
  loading: boolean;
  loggedIn: boolean;
}

export const PopularListView: React.FC<Props> = ({
  movies,
  loading,
  loggedIn,
}) => {
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();
  const height = frame.height - BOTTOM_TABS_HEIGHT - bottom;

  const {t} = useTranslation('movies');

  const {page} = useSelector(popularSelector);
  const [pageState, setPageState] = useState(page);

  const dispatch = useDispatch();

  const handleOnEnd = () => {
    dispatch(getPopular(pageState + 1));
    setPageState(prev => prev + 1);
  };

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  );

  const [layoutProvider] = useState(
    new LayoutProvider(
      () => 1,
      (type, dim) => {
        dim.width = WINDOW_WIDTH;
        dim.height = height;
      },
    ),
  );

  useEffect(() => {
    if (!loading) {
      setDataProvider(prevState => prevState.cloneWithRows(movies));
    }
  }, [loading, movies]);

  const rowRenderer = (type: any, data: Popular) => {
    if (loading) {
      return <Loading />;
    }
    return <PopularItem movie={data} loggedIn={loggedIn} loading={loading} />;
  };
  if (!movies.length && loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Container disableScroll>
          <Animated.Text
            style={styles.headingText}
            entering={FlipInXDown.springify().delay(300)}>
            {t('popular')}
          </Animated.Text>
        </Container>
      </View>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
        renderAheadOffset={5}
        snapToInterval={height}
        onEndReached={handleOnEnd}
        onEndReachedThreshold={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    top: 15,
    position: 'absolute',
    zIndex: 10,
  },
  headingText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});
