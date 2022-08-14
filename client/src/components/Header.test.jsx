import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import * as reduxHooks from 'react-redux';
import * as actions from '../features/auth/authSlice';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
describe('Test Header component', () => {
  it('should be rendered (no user)', () => {
    mockedSelector.mockReturnValue({ user: null });
    mockedDispatch.mockReturnValue(jest.fn());
    const view = render(<Header />, { wrapper: BrowserRouter });
    expect(view).toMatchSnapshot();
    expect(screen.getByText('Login')).toBeVisible();
    expect(screen.getByText('Register')).toBeVisible();
  });

  it('should be rendered (user logged in)', () => {
    mockedSelector.mockReturnValue({ user: { name: 'User' } });
    mockedDispatch.mockReturnValue(jest.fn());
    const view = render(<Header />, { wrapper: BrowserRouter });
    expect(view).toMatchSnapshot();
    expect(screen.getByText('Logout')).toBeVisible();
  });

  it('should dispath actions - logout', () => {
    mockedSelector.mockReturnValue({ user: { name: 'User' } });
    mockedDispatch.mockReturnValue(jest.fn());
    const mockLogout = jest.spyOn(actions, 'logout');
    const mockReset = jest.spyOn(actions, 'reset');
    render(<Header />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
