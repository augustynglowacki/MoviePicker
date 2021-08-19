import 'react-native';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import {Action} from 'src/components/common';
import palette from 'src/styles/palette';

type Shallow = Enzyme.ShallowWrapper<
  any,
  Readonly<{}>,
  React.Component<{}, {}, any>
>;

const findByID = (wrapper: Shallow, value: string) => {
  return wrapper.find({testID: value});
};
let wrapper: Shallow;
const mockCallBack = jest.fn();

describe('Action basic tests', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Action
        label="favorite"
        icon={'heart'}
        onPress={mockCallBack}
        isActive={false}
      />,
    );
  });

  it('Label is passed down correctly', () => {
    const text = findByID(wrapper, 'label');
    expect(text.props().children).toEqual('favorite');
  });

  it('Button is clicked', () => {
    wrapper.simulate('press');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('Action isActive=false testing', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Action
        label="favorite"
        icon={'heart'}
        onPress={mockCallBack}
        isActive={false}
      />,
    );
  });

  it('Icon name got properly added -outline in the component', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().name).toEqual('heart-outline');
  });

  it('Color is white if isActive = false', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().color).toEqual(palette.white);
  });
});

describe('Action isActive=true testing', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Action
        label="favorite"
        icon={'heart'}
        onPress={mockCallBack}
        isActive={true}
      />,
    );
  });

  it('Icon name without -outline', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().name).toEqual('heart');
  });

  it('Color is primary if isActive = true', () => {
    const icon = findByID(wrapper, 'icon');
    expect(icon.props().color).toEqual(palette.primary);
  });
});
