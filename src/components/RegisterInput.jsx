import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-input">
      <label htmlFor="name" className="input-label">Nama</label>
      <input placeholder="Nama" id="name" className="input-field" type="text" value={name} onChange={onNameChange} />

      <label htmlFor="email" className="input-label">Email</label>
      <input placeholder='Email' id="email" className="input-field" type="email" value={email} onChange={onEmailChange} />

      <label htmlFor="password" className="input-label">Password</label>
      <input placeholder='Password' id="password" className="input-field" type="password" value={password} onChange={onPasswordChange} />

      <button type="button" onClick={() => register({ name, email, password })}>Sign Up</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
