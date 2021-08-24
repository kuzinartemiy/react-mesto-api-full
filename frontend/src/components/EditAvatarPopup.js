import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isLoading,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const avatarLinkRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
    avatarLinkRef.current.value = '';
  };

  const stateButtonValue = `${isLoading ? 'Сохранение...' : 'Сохранить'}`;

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='edit-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={stateButtonValue}
    >
      <input ref={avatarLinkRef} required name="newCardLink" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_avatar-link"/>
      <span className="popup__input-error"/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
