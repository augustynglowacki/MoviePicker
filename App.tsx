import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Image, ScrollView} from 'react-native';
import axios from 'axios';
import {API_IMAGES, API_KEY, API_URL} from '@env';
import Home from './src/screens/Home/Home';

const App = () => {
  const [moviesList, setMoviesList] = useState<
    {
      id: Number;
      title: String;
      vote_average: Number;
      poster_path: String; // ściezka do zdjęcia
      overview: String; // opis
    }[]
  >([{id: 0, title: 'none', vote_average: 0, poster_path: '', overview: ''}]);
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

  return (
    <View style={{flex: 1}}>
      <Home moviesList={moviesList} />
    </View>
  );
};

export default App;
