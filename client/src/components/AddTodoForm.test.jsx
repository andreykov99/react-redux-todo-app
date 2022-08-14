import { render, screen, fireEvent } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import * as actions from '../features/todos/todoSlice';

import AddTodoForm from './AddTodoForm';

jest.mock('react-redux');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('AddTodoForm component', () => {
  it('should be rendered', () => {
    // const dispatch = jest.fn();
    // mockedDispatch.mockReturnValue(dispatch);
    const view = render(<AddTodoForm />);
    expect(view).toMatchSnapshot();
  });
  it('should be dispatch addTodo', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockAddTodo = jest.spyOn(actions, 'addTodoAsync');
    const view = render(<AddTodoForm />);
    expect(view).toMatchSnapshot();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 42 } });
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
  });
});
