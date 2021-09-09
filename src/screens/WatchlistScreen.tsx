import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
import {useFocusEffect} from '@react-navigation/native';
import Watchlist from 'src/components/watchlist/Watchlist';
import {getWatchlist} from 'src/redux/collections/CollectionsActions';

const WatchlistScreen: React.FC = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getWatchlist());
    }, [dispatch]),
  );

  const {watchlist} = useSelector(collectionsSelector);

  return <Watchlist movies={watchlist} />;
};

export default WatchlistScreen;
