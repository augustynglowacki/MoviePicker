import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {Action} from 'src/components/common';
import palette from 'src/styles/palette';
import {findByID} from '__utils__';

const mockCallBack = jest.fn();

describe('Action basic tests', () => {
  const wrapper = shallow(
    <Action
      label="favorite"
      icon={'heart'}
      onPress={mockCallBack}
      isActive={false}
    />,
  );

  it('Label is passed down correctly', () => {
    const text = findByID(wrapper, 'label');
    expect(text.props().children).toEqual('favorite');
  });

  it('Button is clicked', () => {
    wrapper.simulate('press');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('Action isActive=true testing', () => {
  const wrapper = shallow(
    <Action label="favorite" icon={'heart'} onPress={mockCallBack} isActive />,
  );

  it('Icon name without -outline', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().name).toEqual('heart');
  });

  it('Color is primary if isActive = true', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().color).toEqual(palette.primary);
  });
});
