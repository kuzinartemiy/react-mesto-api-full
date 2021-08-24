// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegister, name }) {
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
    onRegister({
      email,
      password,
    });
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} name={name} action="#" className="auth__form" autoComplete="off">
        <h2 className="auth__title">Регистрация</h2>
        <input value={email} onChange={handleChangeEmail} required name="login" type="email" placeholder="Email" className="auth__input"/>
        <input value={password} onChange={handleChangePassword} required name="password" type="password" placeholder="Пароль" className="auth__input"/>
        <button aria-label="Войти" type="submit" className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <p className="auth__caption">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
    </div>
  );
}

export default Register;
