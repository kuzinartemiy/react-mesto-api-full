import { useState } from 'react';

function Login({ onLogin, name }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email,
      password,
    });
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} name={name} action="#" className="auth__form" autoComplete="off">
        <h2 className="auth__title">Вход</h2>
        <input value={email} onChange={handleChangeEmail} required name="login" type="email" placeholder="Email" className="auth__input auth__input_field_email"/>
        <input value={password} onChange={handleChangePassword} required name="password" type="password" placeholder="Пароль" className="auth__input auth__input_field_password"/>
        <button aria-label="Войти" type="submit" className="auth__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
