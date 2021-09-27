import React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const ReduxProvider: React.FC = ({children}) => {
  const mockStore = configureMockStore([thunk]);
  return <Provider store={mockStore()}>{children}</Provider>;
};
