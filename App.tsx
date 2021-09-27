import React, {useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import palette from 'src/styles/palette';
import {batch, useDispatch, useSelector} from 'react-redux';
import {getPopular} from 'src/redux/popular/PopularActions';
import {
  getFavorite,
  getWatched,
  getWatchlist,
} from 'src/redux/collections/CollectionsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from 'src/components/common';
import {popularSelector} from 'src/redux/popular/PopularSlice';
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
  const {page} = useSelector(popularSelector);
  useEffect(() => {
    batch(() => {
      dispatch(getPopular(page));
      dispatch(getFavorite());
      dispatch(getWatchlist());
      dispatch(getWatched());
    });
    RNBootSplash.hide({fade: true});
  }, [dispatch, page]);

  const [state, setState] = useState({isFirstLaunch: false, checked: false});
  const check = async () => {
    await AsyncStorage.getItem('hasLaunched').then(value => {
      if (!value) {
        AsyncStorage.setItem('hasLaunched', 'true');
        setState({isFirstLaunch: true, checked: true});
      } else {
        setState({isFirstLaunch: false, checked: true});
      }
    });
  };
  useEffect(() => {
    check();
  }, []);

  if (!state.checked) {
    return <Loading />;
  }
  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <HomeNavigator firstLaunch={state.isFirstLaunch} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
