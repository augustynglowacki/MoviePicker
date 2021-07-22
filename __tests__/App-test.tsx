/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SectionHeader from '../src/components/atoms/SectionHeader';

it('renders correctly', () => {
  renderer.create(<SectionHeader text="" />);
});
