import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';

const App = () => {
  const status = useSelector((state) => state.todos.status);

  const isLoading = status === 'idle' || status === 'pending';
  return (
    <>
      <div className="container bg-white p-4 mt-5">
        <h1>My Todo List</h1>
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default App;
