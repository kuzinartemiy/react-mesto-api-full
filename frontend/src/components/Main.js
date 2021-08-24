/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onImage,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className="profile__avatar-edit" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button onClick={onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button"/>
        </div>
        <button onClick={onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"/>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map((card) => (
              <Card
                onCardClick={onImage}
                cardData={card}
                key={card._id}
                onCardLike={onCardLike}
                onCardDeleteClick={onCardDelete}
              />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
