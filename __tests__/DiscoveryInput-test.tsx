import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import DiscoveryInput from '../src/components/atoms/DiscoveryInput';
import {I18nextProvider} from 'react-i18next';
import i18n from '../src/locale/i18n';

test('Should dispatch an action', () => {
  const mockStore = configureStore([]);
  const store = mockStore({query: ''});
  const rendered = render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <DiscoveryInput />
      </I18nextProvider>
    </Provider>,
  );
  const input = rendered.getByTestId(/testInput/i);
  fireEvent.changeText(input, 'Star');
  const actions = store.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0].type).toBe('searchedData/setQuery');
  expect(actions[0].payload).toBe('Star');
});
