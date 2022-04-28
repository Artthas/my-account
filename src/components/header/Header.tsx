import SCSS from './Header.module.scss';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {signOutAction} from '../../store/api-actions';
import {getUserAvatarUrl} from '../../services/user-avatar-url';
import Logo from '../logo/Logo';
import React from 'react';

type HeaderProps = {
  isContacts: boolean,
  isSignIn: boolean,
  headerTitle: string,
}

function Header({isContacts, isSignIn, headerTitle}: HeaderProps): JSX.Element {
  const userAvatarUrl = useSelector(getUserAvatarUrl);

  const dispatch = useDispatch();

  return (
    <header className={SCSS[`${headerTitle}`]}>

      <Logo logoTitle='logo__link'/>

      {!isContacts && !isSignIn ? <h1 className={SCSS['user-page__title']}>Sign up</h1> : ''}

      {isContacts ?
        <React.Fragment>
          <h1 className={SCSS['user-page__title']}>Contacts</h1>
          <ul className={SCSS['user-block']}>
            <li className={SCSS['user-block__item']}>
              <div className={SCSS['user-block__avatar']}>
                <img src={userAvatarUrl} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className={SCSS['user-block__item']}>
              <a
                className={SCSS['user-block__link']}
                href="/"
                onClick={(evt) => {
                evt.preventDefault();
                dispatch(signOutAction());
                }}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </React.Fragment> : ''}

      {isSignIn ? <h1 className={SCSS['user-page__title']}>Sign in</h1> : ''}
    </header>
  );
}

export default Header;
