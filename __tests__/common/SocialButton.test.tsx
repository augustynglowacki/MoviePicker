import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {SocialButton} from 'src/components/common';
import {findByID} from '__utils__';

const mockOnPress = jest.fn();
const mockIcon = require('src/assets/images/google-logo.png');

describe('Social Button', () => {
  const wrapper = shallow(
    <SocialButton onPress={mockOnPress} icon={mockIcon} />,
  );

  it('OnPress test: ', () => {
    wrapper.simulate('press');
    expect(mockOnPress.mock.calls.length).toEqual(1);
  });

  it('Image component: ', () => {
    const image = findByID(wrapper, 'image');
    expect(image.props().source).toEqual(mockIcon);
    expect(image.props().style.width && image.props().style.height).toEqual(30);
  });
});
