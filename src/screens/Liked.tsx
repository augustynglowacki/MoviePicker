import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMoviesStarted} from '../redux/movies/moviesActions';

const Liked = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state: any) => state);

  console.log('Loading state in Liked :>>', loading);

  return (
    <View style={styles.wrapper}>
      <Button title="dddd" onPress={() => dispatch(getMoviesStarted())} />
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
