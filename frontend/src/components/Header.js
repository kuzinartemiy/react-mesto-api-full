import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, Route } from 'react-router-dom';

function Header({ onSignOut, email }) {
  const [isMenuOpened, setMenuOpen] = useState(false);

  const stateProfileClass = `header__profile ${isMenuOpened ? 'header__profile_opened' : ''}`;
  const stateMenuClass = `header__menu header__menu_type_${isMenuOpened ? 'close' : 'open'}`;
  const stateHeaderContentClass = `header__content ${isMenuOpened ? 'header__content_opened' : ''}`;

  const handleOpenMenu = () => {
    setMenuOpen(!isMenuOpened);
  };

  const handleSignOut = () => {
    onSignOut();
    setMenuOpen(false);
  };

  return (
    <header className='header'>
      <div className={stateHeaderContentClass}>
        <Link to="/" className="header__logo"/>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <button className={stateMenuClass} onClick={handleOpenMenu}/>
          <div className={stateProfileClass}>
            <p className="header__email">{email}</p>
            <Link onClick={handleSignOut} to="sign-in" className="header__link">Выйти</Link>
          </div>

        </Route>
      </div>

    </header>
  );
}

export default Header;
