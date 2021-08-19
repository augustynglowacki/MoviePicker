import {render} from '@testing-library/react-native';
import React from 'react';
import SectionHeader from '../../src/components/common/SectionHeader';

test('Check if SectionHeader renders with provided text', () => {
  const header = render(<SectionHeader text="title" />);
  const title = header.getByText(/title/i);
  expect(title.props.children).toBe('title');
});
