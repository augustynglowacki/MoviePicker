import React, {useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  //TO DO render onboarding screen based on isFirstLaunch
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
