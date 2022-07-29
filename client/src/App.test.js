import React from 'react';
import { render, screen } from '@testing-library/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './App';

test('renders header brand TodoApp link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/TodoApp/i);
  expect(linkElement).toBeInTheDocument();
});
