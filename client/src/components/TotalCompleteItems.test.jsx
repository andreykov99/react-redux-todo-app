import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import TotalCompleteItems from './TotalCompleteItems';

jest.mock('react-redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector');

describe('TotalcompleteItems component', () => {
  it('should be rendered', () => {
    mockedSelector.mockReturnValue({ todos: [] });
    const view = render(<TotalCompleteItems />);
    expect(view).toMatchSnapshot();
  });
});
