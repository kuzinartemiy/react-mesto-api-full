// eslint-disable-next-line no-unused-vars
import React from 'react';

function PopupWithForm({
  isOpen,
  onSubmit,
  onClose,
  title,
  buttonText,
  name,
  children,
}) {
  const handleClick = () => {
    onClose();
  };

  const stateClassName = `popup ${isOpen ? 'popup_opened' : ''} `;
  return (
    <div className={stateClassName}>
      <div className="popup__container">
        <form onSubmit={onSubmit} name={name} action="#" className="popup__form" autoComplete="off">
          <button onClick={handleClick} aria-label="Закрыть" type="button" className="popup__close-button"></button>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button aria-label="Сохранить" type="submit" className="popup__save-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
