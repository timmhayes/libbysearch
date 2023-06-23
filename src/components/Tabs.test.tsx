import { render, fireEvent } from '@testing-library/react';
import { Tabs, TabPanel } from './Tabs';

describe('Tabs', () => {

  test('renders with correct number of tabs and default tab selected', () => {
    const { getByText } = render(
      <Tabs defaultTabIndex={1}>
        <TabPanel title="Tab 1">Content 1</TabPanel>
        <TabPanel title="Tab 2">Content 2</TabPanel>
        <TabPanel title="Tab 3">Content 3</TabPanel>
      </Tabs>
    );

    expect(getByText('Tab 1').closest('button')).toBeInTheDocument();
    const tab2 = getByText('Tab 2').closest('button');
    expect(tab2).toBeInTheDocument();
    if (tab2) expect(tab2.getAttribute('aria-current')).toBe('true');
    expect(getByText('Tab 3').closest('button')).toBeInTheDocument();
  });

  test('changes active tab and displays corresponding panel on tab click', () => {
    const { getByText, getByLabelText } = render(
      <Tabs defaultTabIndex={0}>
        <TabPanel title="Tab 1">Content 1</TabPanel>
        <TabPanel title="Tab 2">Content 2</TabPanel>
        <TabPanel title="Tab 3">Content 3</TabPanel>
      </Tabs>
    );

    const tab1 = getByText('Tab 1').closest('button');
    const tab2 = getByText('Tab 2').closest('button');
    const tab3 = getByText('Tab 3').closest('button');
    const panel1 = getByText('Content 1');
    const panel2 = getByText('Content 2');
    const panel3 = getByText('Content 3');

    if (tab1) expect(tab1.getAttribute('aria-current')).toBe('true');
    expect(panel1).toHaveClass('tab-panel-active');
    if (tab2) expect(tab2.getAttribute('aria-current')).toBe('false');
    expect(panel2).not.toHaveClass('tab-panel-active');
    if (tab3) expect(tab3.getAttribute('aria-current')).toBe('false');
    expect(panel3).not.toHaveClass('tab-panel-active');

    if (tab2) fireEvent.click(tab2);

    if (tab1) expect(tab1.getAttribute('aria-current')).toBe('false');
    expect(panel1).not.toHaveClass('tab-panel-active');
    if (tab2) expect(tab2.getAttribute('aria-current')).toBe('true');
    expect(panel2).toHaveClass('tab-panel-active');
    if (tab3) expect(tab3.getAttribute('aria-current')).toBe('false');
    expect(panel3).not.toHaveClass('tab-panel-active');
  });

});
