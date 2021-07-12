import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';
import {API_KEY, API_URL} from '@env';
import Home from './src/screens/Home/Home';
import {IMovie} from './src/models/models';

const App = () => {
  const [moviesList, setMoviesList] = useState<Array<IMovie>>([
    {id: 0, title: 'none', vote_average: 0, poster_path: '', overview: ''},
  ]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=2`)
      .then(res => {
        setMoviesList(res.data.results);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  console.log(fetchError);

  return (
    <View style={styles.container}>
      <Home moviesList={moviesList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
