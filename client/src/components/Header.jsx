import React from 'react';

import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">TodoApp</Link>
        </div>
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
