import { useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  onAddPlace,
  isLoading,
  isOpen,
  onClose,
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  };

  const stateButtonValue = `${isLoading ? 'Добавление...' : 'Добавить'}`;

  return (
    <PopupWithForm
        title='Новое место'
        name='add-card'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={stateButtonValue}
      >
        <input value={name} onChange={handleChangeName} required name="newCardName" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" minLength="2" maxLength="30"/>
        <span className="popup__input-error"/>
        <input value={link} onChange={handleChangeLink} required name="newCardLink" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link"/>
        <span className="popup__input-error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
