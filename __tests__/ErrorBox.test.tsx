import 'react-native';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import {ErrorBox} from 'src/components/common';

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

describe('ErrorBox', () => {
  let wrapper: Enzyme.ShallowWrapper<any>;

  beforeEach(() => {
    wrapper = shallow(<ErrorBox errorMsg={'Network Error'} />);
  });

  it('Error message', () => {
    const text = findByID(wrapper, 'error-message');
    expect(text.props().children).toEqual('Network Error');
  });
});
