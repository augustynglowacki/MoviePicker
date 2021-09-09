import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import palette from 'src/styles/palette';
import {batch, useDispatch} from 'react-redux';
import {getPopular} from 'src/redux/popular/PopularActions';
import {
  getFavorite,
  getWatched,
  getWatchlist,
} from 'src/redux/collections/CollectionsActions';

//app background changed to black
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    background: palette.strongBlack,
  },
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(getPopular());
      dispatch(getFavorite());
      dispatch(getWatchlist());
      dispatch(getWatched());
    });

    RNBootSplash.hide({fade: true});
  }, [dispatch]);
  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
