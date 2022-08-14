import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('should be rendered', () => {
    const view = render(<Spinner />);
    expect(view).toMatchSnapshot();
  });
});
