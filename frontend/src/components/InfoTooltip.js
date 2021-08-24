function InfoTooltip({
  isOpen,
  onClose,
  isAuthSuccess,
  title,
}) {
  const handleClick = () => {
    onClose();
  };

  const statePopupClassName = `popup ${isOpen ? 'popup_opened' : ''}`;
  const stateLogoClassName = `popup__logo ${isAuthSuccess ? 'popup__logo_type_success' : 'popup__logo_type_fail'}`;

  return (
    <div className={statePopupClassName}>
      <div className="popup__container">
        <button onClick={handleClick} aria-label="Закрыть" type="button" className="popup__close-button"/>
        <div className={stateLogoClassName}/>
        <p className="popup__title popup__title_type_info">{title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
