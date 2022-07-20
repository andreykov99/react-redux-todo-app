import React from 'react';
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );
  const user = '';
  const isError = false;
  const isLoading = false;
  const isSuccess = false;
  const message = '';

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // const userData = {
    //   email,
    //   password,
    // };

    // dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading container">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start ToDo</p>
      </section>

      <section className="form container">
        <form onSubmit={onSubmit} className="form-floating col-6">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
            <label htmlFor="email">Enter your email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
            <label htmlFor="password">Enter password</label>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
