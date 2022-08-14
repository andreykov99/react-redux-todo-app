import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import * as reduxHooks from 'react-redux';
import * as actions from '../features/todos/todoSlice';

jest.mock('react-redux');

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('TodoItem component', () => {
  it('component should be rendered', () => {
    mockedDispatch.mockReturnValue(jest.fn());

    const view = render(
      <TodoItem id="123" title="todo item" completed={false} />
    );
    expect(view).toMatchSnapshot();
  });
  it('should dispatch toggleComplete action with id when checkbox clicked', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockToggleComlete = jest.spyOn(actions, 'toggleCompleteAsync');
    render(<TodoItem id="123" title="todo item" completed={false} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockToggleComlete).toHaveBeenCalledWith({
      completed: true,
      id: '123',
    });
  });
  it('should dispatch delete action with id when delete button clicked', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockDeleteTodo = jest.spyOn(actions, 'deleteTodoAsync');
    render(<TodoItem id="123" title="todo item" completed={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith({
      id: '123',
    });
  });
});
