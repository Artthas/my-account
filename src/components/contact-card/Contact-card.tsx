import SCSS from './Contact-card.module.scss';
import './Contact-card.module.scss';
import {Contact, ContactPost} from '../../types/contact';
import {deleteContactAction, editContactAction, postContactAction} from '../../store/api-actions';
import React, {ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {useDispatch, useSelector} from 'react-redux';
import {getContacts, getPostContactId} from '../../store/contacts-data/selectors';
import {loadContacts, loadPostContactId} from '../../store/action';

type ContactCardProps = {
  contact: Contact,
}

function ContactCard({contact}: ContactCardProps): JSX.Element {
  const contacts = useSelector(getContacts);
  const postContactId = useSelector(getPostContactId);

  const dispatch = useDispatch();

  const [isCard, setIsCard] = useState(true);
  const [isCardEdit, setIsCardEdit] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [contactInfo, setContactInfo] = useState({'name': contact.name, 'image': contact.image});

  const cardEditRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Number(postContactId) === contact.id) {
      setIsCard(false);
      setIsCardEdit(true);
      setIsCardHover(false);
    }
  }, [postContactId, contact.id]);
  
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(String(contact.id), {
      name: contactInfo.name,
      image: contactInfo.image,
    });
  };

  const onSubmit = (contactId: string, {name, image}: ContactPost) => {
    if (Number(postContactId) === contact.id) {
      dispatch(postContactAction({id: Number(contactId), name, image}, onSuccess));
      dispatch(loadPostContactId(String(0)))
    } else {
      dispatch(editContactAction(contactId, {name, image}, onSuccess));
    }
  };

  const onSuccess = () => {
    setIsCardEdit(false);
  };

  const nameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setContactInfo((prevState) => ({...prevState, 'name': evt.target.value}));
  }

  const onEditClick = () => {
    setIsCard(false);
    setIsCardEdit(true);
    setIsCardHover(false);
  }

  const onOverlayClick = () => {
    setContactInfo({'name': contact.name, 'image': contact.image});
    setIsCardEdit(false);
    if (Number(postContactId) === contact.id) {
      const newContacts = [...contacts];
      const postContactIdx = newContacts.findIndex((contact) => contact.id === Number(postContactId));
      newContacts.splice(postContactIdx, 1);
      dispatch(loadContacts(newContacts));
    }
  }

  const onCloseClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setContactInfo({'name': contact.name, 'image': contact.image});
    setIsCardEdit(false);
    if (Number(postContactId) === contact.id) {
      const newContacts = [...contacts];
      const postContactIdx = newContacts.findIndex((contact) => contact.id === Number(postContactId));
      newContacts.splice(postContactIdx, 1);
      dispatch(loadContacts(newContacts));
    }
  }

  const onBtnRightClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (Number(contactInfo.image.slice(21, -4)) < 18) {
      setContactInfo((prevState) => ({...prevState, 'image': `${contactInfo.image.slice(0, 21)}${Number(contactInfo.image.slice(21, -4)) + 1}.jpg`}));
    }
  }

  const onBtnLeftClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (Number(contactInfo.image.slice(21, -4)) > 1) {
      setContactInfo((prevState) => ({...prevState, 'image': `${contactInfo.image.slice(0, 21)}${Number(contactInfo.image.slice(21, -4)) - 1}.jpg`}));
    }
  }

  const onDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(deleteContactAction(String(contact.id), onSuccess));
  }

  return (
    <React.Fragment>
      {isCard ?
        <article
          className={SCSS.card} key={contact.id}
          onMouseOver={() => setIsCardHover(true)}
          onMouseLeave={() => setIsCardHover(false)}
        >
          <div className={SCSS.image}>
            <img src={contact.image} alt={contact.name} width="280" height="175"/>
          </div>
          <h3 className={SCSS.title}>{contact.name}</h3>
          {isCardHover ?
            <React.Fragment>
              <button
                className={SCSS.edit}
                onClick={onEditClick}
              >
                Edit
              </button>
              <button className={SCSS.delete} onClick={onDeleteClick}>
                <svg fill="rgba(217, 202, 116, 0.7)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6367188 13 L 11.15625 39.029297 C 11.43025 41.862297 13.785813 44 16.632812 44 L 31.367188 44 C 34.214187 44 36.56875 41.862297 36.84375 39.029297 L 39.363281 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 19.5 18 C 20.328 18 21 18.671 21 19.5 L 21 34.5 C 21 35.329 20.328 36 19.5 36 C 18.672 36 18 35.329 18 34.5 L 18 19.5 C 18 18.671 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.671 30 19.5 L 30 34.5 C 30 35.329 29.328 36 28.5 36 C 27.672 36 27 35.329 27 34.5 L 27 19.5 C 27 18.671 27.672 18 28.5 18 z"/></svg>
              </button>
            </React.Fragment> : ''}
        </article> : ''}
      <CSSTransition
        in={isCardEdit}
        timeout={300}
        unmountOnExit
        nodeRef={cardEditRef}
        classNames={{
          enter: SCSS.cardEditEnter,
          enterActive: SCSS.cardEditEnterActive,
          enterDone: SCSS.cardEditEnterDone,
          exit:  SCSS.cardEditExit,
          exitActive:  SCSS.cardEditExitActive
        }}
        onExited={() => setIsCard(true)}
      >
        <div ref={cardEditRef} className={SCSS.cardEdit} key={contact.id}>
          <div
            className={SCSS.overlay}
            data-close-modal
            onClick={onOverlayClick}
          ></div>
          <form onSubmit={handleSubmit}>
            <div className={SCSS.image}>
              <img src={contactInfo.image} alt={contactInfo.name} width="280" height="175"/>
            </div>
            <div className={SCSS.imagesBtn}>
              <button className={SCSS.btnLeft} onClick={onBtnLeftClick}>
                <svg fill="#C9B37E" xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 298 511.93"><path d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"/></svg>
              </button>
              <button className={SCSS.btnRight} onClick={onBtnRightClick}>
                <svg fill="#C9B37E" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 298 511.93"><path d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>
              </button>
            </div>
            <input
              className={SCSS.input}
              id='name'
              type='text'
              name="name"
              placeholder='Name'
              value={contactInfo.name}
              onChange={nameHandler}
            />
            {Number(postContactId) !== contact.id ?
              <button className={SCSS.delete} onClick={onDeleteClick}>
                <svg fill="#C9B37E" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6367188 13 L 11.15625 39.029297 C 11.43025 41.862297 13.785813 44 16.632812 44 L 31.367188 44 C 34.214187 44 36.56875 41.862297 36.84375 39.029297 L 39.363281 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 19.5 18 C 20.328 18 21 18.671 21 19.5 L 21 34.5 C 21 35.329 20.328 36 19.5 36 C 18.672 36 18 35.329 18 34.5 L 18 19.5 C 18 18.671 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.671 30 19.5 L 30 34.5 C 30 35.329 29.328 36 28.5 36 C 27.672 36 27 35.329 27 34.5 L 27 19.5 C 27 18.671 27.672 18 28.5 18 z"/></svg>
              </button> : ''}
            <button className={SCSS.close} onClick={onCloseClick}>
              <svg fill="#C9B37E" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 28 28" width="16px" height="16px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
            </button>
            <button className={SCSS.save} type="submit">Save</button>
          </form>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}

export default ContactCard;
