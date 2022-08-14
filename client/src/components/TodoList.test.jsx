import { render } from '@testing-library/react';
import TodoList from './TodoList';
import * as reduxHooks from 'react-redux';
import * as actions from '../features/todos/todoSlice';

jest.mock('react-redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
describe('TodoList component', () => {
  it('should be rendered with todos', () => {
    mockedSelector.mockReturnValue([
      { id: '123', title: 'Todo1', completed: false },
    ]);
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockGetTodos = jest.spyOn(actions, 'getTodosAsync');
    const view = render(<TodoList />);
    expect(view).toMatchSnapshot();
    expect(mockGetTodos).toHaveBeenCalled();
  });
  it('should be rendered without todos', () => {
    mockedSelector.mockReturnValue([]);
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockGetTodos = jest.spyOn(actions, 'getTodosAsync');
    const view = render(<TodoList />);
    expect(view).toMatchSnapshot();
    expect(mockGetTodos).toHaveBeenCalled();
  });
});
