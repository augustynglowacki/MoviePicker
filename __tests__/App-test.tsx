/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SearchErrorBox from '../src/components/atoms/SearchErrorBox';
import {Text} from 'react-native';

it('renders correctly', () => {
  renderer.create(
    <SearchErrorBox loading error="" children={<Text>dds</Text>} />,
  );
});
