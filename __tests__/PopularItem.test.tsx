import 'react-native';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import PopularItem from 'src/components/popular/PopularItem';
import {Popular} from 'src/models';

const findByID = (
  wrapper: Enzyme.ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >,
  value: string,
) => {
  return wrapper.find({testID: value});
};

describe('is Liked', () => {
  let wrapper: Enzyme.ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;

  beforeEach(() => {
    wrapper = shallow(<PopularItem movie={{} as Popular} />);
  });

  it('Movie is liked', () => {
    const component = findByID(wrapper, 'heart');
    expect(component).toHaveLength(0);
  });
});
