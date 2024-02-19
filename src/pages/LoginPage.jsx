import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page-hero" />
      <div className="login-page-main">
        <div className="login-container">
          <LoginInput login={onLogin} />
          <p>
            Belum punya akun?
            <Link to="/register"> Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
