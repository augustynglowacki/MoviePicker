import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {Loading} from 'src/components/common';
import {findByID} from '__utils__';

describe('Loading', () => {
  const wrapper = shallow(<Loading />);

  it('Lottie autoPlay is on: ', () => {
    const loading = findByID(wrapper, 'loading');
    expect(loading.props().autoPlay).toEqual(true);
  });

  it('Loading source: ', () => {
    const source = require('src/assets/lottie/popcorn.json');
    const loading = findByID(wrapper, 'loading');
    expect(loading.props().source).toEqual(source);
  });

  it('Loading style: ', () => {
    const style = {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: '20%',
    };
    const loading = findByID(wrapper, 'loading');
    expect(loading.props().style).toEqual(style);
  });
});
