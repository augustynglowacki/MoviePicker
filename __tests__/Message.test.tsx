import {render} from '@testing-library/react-native';
import React from 'react';
import {Message} from 'src/components/common';
import {ReduxProvider} from '__utils__';

describe('is Liked', () => {
  it('Message', () => {
    const header = render(
      <ReduxProvider>
        <Message label="title" />
      </ReduxProvider>,
    );
    const title = header.getByText(/title/i);
    expect(title.props.children).toBe('title');
  });
});
