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
      .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => {
        setMoviesList(res.data.results);
      })
      .catch(e => {
        console.log(e);
        setFetchError(true);
      });
  }, []);

  console.log(moviesList);
  return (
    <View style={{flex: 1}}>
      <Home moviesList={moviesList} />
    </View>
  );
};

export default App;

// <SafeAreaView>
// <ScrollView>
//   {fetchError === true ? (
//     <Text>Error</Text>
//   ) : (
//     moviesList.map(movie => {
//       return (
//         <View key={movie.id}>
//           <Text>{movie.title}</Text>
//           <Text>{movie.overview}</Text>
//           <Text>{movie.vote_average}</Text>

//           <Image
//             source={{
//               uri: `${API_IMAGES}${movie.poster_path}`,
//             }}
//             style={{width: 400, height: 400}}
//           />
//         </View>
//       );
//     })
//   )}
// </ScrollView>
// </SafeAreaView>
