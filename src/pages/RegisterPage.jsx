import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page-hero" />
      <div className="register-page-main">
        <div className="register-container">
          <RegisterInput register={onRegister} />
          <p>
            Sudah punya akun?
            <Link to="/login"> Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
