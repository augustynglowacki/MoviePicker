import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import PopularItem from 'src/components/popular/PopularItem';
import {Popular} from 'src/models';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {findByID, Shallow} from '__utils__';

const ReduxProvider: React.FC = ({children}) => {
  const mockStore = configureMockStore([thunk]);
  return <Provider store={mockStore()}>{children}</Provider>;
};

describe('is Liked', () => {
  let wrapper: Shallow;

  beforeEach(() => {
    wrapper = shallow(
      <ReduxProvider>
        <PopularItem movie={{} as Popular} />
      </ReduxProvider>,
    );
  });

  it('Movie is liked', () => {
    const component = findByID(wrapper, 'heart');
    expect(component).toHaveLength(0);
  });
});
