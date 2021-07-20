import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {MoviesProvider} from './src/mobx/movies/MoviesContext';
const Root = () => (
  <MoviesProvider>
    <App />
  </MoviesProvider>
);

AppRegistry.registerComponent(appName, () => Root);
