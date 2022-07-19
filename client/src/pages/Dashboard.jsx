import React from 'react';
import { useSelector } from 'react-redux';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import TotalCompleteItems from '../components/TotalCompleteItems';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const status = useSelector((state) => state.todos.status);
  const isLoading = status === 'idle' || status === 'pending';
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
      {isLoading && <Spinner />}
    </div>
  );
};
export default Dashboard;
