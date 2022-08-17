import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../features/todos/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.entries);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {todos.map(({ _id: id, title, completed }) => (
        <TodoItem key={id} id={id} title={title} completed={completed} />
      ))}
    </ul>
  );
};

export default TodoList;
