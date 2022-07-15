import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
  const comletedTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  ).length;
  return <h4 className="mt-3">Total Complete Items: {comletedTodos}</h4>;
};

export default TotalCompleteItems;
