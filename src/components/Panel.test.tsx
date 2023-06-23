import { render } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel', () => {

  test('renders with title and content', () => {
    const { getByText } = render(
      <Panel title="Panel Title">
        <p>Panel Content</p>
      </Panel>
    );

    expect(getByText('Panel Title')).toBeInTheDocument();
    expect(getByText('Panel Content')).toBeInTheDocument();
  });

  test('renders Panel component without title', () => {
    const { queryByText } = render(
      <Panel>
        <p>Panel Content</p>
      </Panel>
    );

    expect(queryByText('Panel Title')).toBeNull();
    expect(queryByText('Panel Content')).toBeInTheDocument();
  });

})