/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import InfoTooltip from './InfoTooltip.js';

import api from '../utils/api.js';
import auth from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  const infoTooltipTitle = `${isAuthSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`;

  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      history.push('/');
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, gettedCards]) => {
          setEmail(userData.email);
          setCurrentUser(userData);
          setCards(gettedCards.reverse());
        })
        .catch((error) => {
          console.log(`Ошибка при получении данных: ${error}`);
        });
    }
  }, [token]);

  const handleCardClick = (targetCard) => {
    setImagePopupOpen(true);
    setSelectedCard(targetCard);
  };

  const handleDeleteCardClick = (targetCard) => {
    setDeleteCardPopupOpen(true);
    setSelectedCard(targetCard);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);

    api.setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при обновлении данных пользователя: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);

    api.setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при обновлении аватара: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((error) => {
        console.log(`Ошибка при установке/удалении лайка: ${error}`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((i) => i._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);

    api.addCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при добавлении новой карточки: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (signUpData) => {
    auth.signUp(signUpData)
      .then(() => {
        setIsAuthSuccess(true);
        history.push('/sign-in');
      })
      .catch((error) => {
        setIsAuthSuccess(false);
        console.log(error);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      });
  };

  const handleLogin = (signInData) => {
    auth.signIn(signInData)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setEmail(signInData.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((error) => {
        setIsAuthSuccess(false);
        setInfoTooltipOpen(true);
        console.log(error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} onSignOut={handleSignOut}/>
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onImage={handleCardClick}
              onCardDelete={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route>
              { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isAuthSuccess={isAuthSuccess}
            title={infoTooltipTitle}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
