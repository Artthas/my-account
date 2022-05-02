import styles from './Header.module.scss';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {signOutAction} from '../../store/api-actions';
import {getUserAvatarUrl} from '../../services/user-avatar-url';
import Logo from '../logo/Logo';
import React from 'react';

type HeaderProps = {
  isContacts: boolean,
  isSignIn: boolean,
}

function Header({isContacts, isSignIn}: HeaderProps): JSX.Element {
  const userAvatarUrl = useSelector(getUserAvatarUrl);

  const dispatch = useDispatch();

  return (
    <header className={styles.header}>

      <Logo logoTitle="link"/>

      {isSignIn ? <h1 className={styles.title}>Sign in</h1> : ''}

      {!isContacts && !isSignIn ? <h1 className={styles.title}>Sign up</h1> : ''}

      {isContacts ?
        <React.Fragment>
          <h1 className={styles.title}>Contacts</h1>
          <ul className={styles.user}>
            <li className={styles.userItem}>
              <div className={styles.userAvatar}>
                <img src={userAvatarUrl} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className={styles.userItem}>
              <a
                className={styles.userLink}
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
    </header>
  );
}

export default Header;
