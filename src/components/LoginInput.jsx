import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-input">
      <label className="input-label">Email</label>
      <input className="input-field" type="email" value={email} onChange={onEmailChange} placeholder="Email" />

      <label className="input-label">Password</label>
      <input className="input-field" type="password" value={password} onChange={onPasswordChange} placeholder="Password" />

      <button type="button" onClick={() => login({ email, password })}>Log In</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
