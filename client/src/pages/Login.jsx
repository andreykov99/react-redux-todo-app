import React from 'react';
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, status, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'error') {
      toast.error(message);
    }

    if (status === 'resolved' || user) {
      navigate('/');
    }
  }, [user, status, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (status === 'pending') {
    return <Spinner />;
  }

  return (
    <div className="container">
      <section className="row justify-content-center">
        <div className="col-md-6">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login and start ToDo</p>
        </div>
      </section>

      <section className="row justify-content-center">
        <form onSubmit={onSubmit} className="form-floating col-md-6">
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
    </div>
  );
};

export default Login;
