import React, {useCallback} from 'react';
import Favorite from 'src/components/favorite/Favorite';
import {useDispatch, useSelector} from 'react-redux';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
import {getFavorite} from 'src/redux/collections/CollectionsActions';
import {useFocusEffect} from '@react-navigation/native';

const FavoriteScreen: React.FC = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getFavorite());
    }, [dispatch]),
  );

  const {favorite} = useSelector(collectionsSelector);

  return <Favorite movies={favorite.movies} />;
};

export default FavoriteScreen;
