// eslint-disable-next-line no-unused-vars
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({
  card,
  isLoading,
  isOpen,
  onClose,
  onDeleteCard,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDeleteCard(card);
  };

  const stateButtonValue = `${isLoading ? 'Удаление...' : 'Да'}`;

  return (
    <PopupWithForm
      title="Вы уверены?"
      name='delete-card'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={stateButtonValue}
    />
  );
}

export default DeleteCardPopup;
