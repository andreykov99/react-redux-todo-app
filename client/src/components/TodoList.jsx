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
    <>
      {todos.length > 0 ? (
        <ul className="list-group">
          {todos.map(({ _id: id, title, completed }) => (
            <TodoItem key={id} id={id} title={title} completed={completed} />
          ))}
        </ul>
      ) : (
        <h3>You have not set any todos</h3>
      )}
    </>
  );
};

export default TodoList;
