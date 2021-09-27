import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {name as appName} from './app.json';
import i18n from './src/locale/i18n';
import {I18nextProvider} from 'react-i18next';

const Root = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
