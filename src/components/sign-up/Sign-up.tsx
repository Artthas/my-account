import styles from './Sign-up.module.scss';
import Footer from '../footer/Footer';
import {SignUpData} from '../../types/sign-up-data';
import {fetchContactsAction, signUpAction} from '../../store/api-actions';
import {useRef, FormEvent} from 'react';
import {AppRoute} from '../../const';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Header from '../header/Header';
import React from 'react';

function SignUp(): JSX.Element {

  const dispatch = useDispatch();

  const onSuccess = () => {
    dispatch(fetchContactsAction());
    history.push(AppRoute.Root);
  };

  const onSubmit = (signUpData: SignUpData) => {
    dispatch(signUpAction(signUpData, onSuccess));
  };

  const history = useHistory();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordFirstRef = useRef<HTMLInputElement | null>(null);
  const passwordSecondRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (passwordFirstRef.current && passwordSecondRef.current && emailRef.current && nameRef.current) {
      if (!re.test(passwordFirstRef.current.value)) {
        passwordFirstRef.current.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры.');
        passwordFirstRef.current.reportValidity();
      } else if (passwordFirstRef.current.value !== passwordSecondRef.current.value) {
        passwordFirstRef.current.setCustomValidity('Пароли должны совпадать.');
        passwordFirstRef.current.reportValidity();
      } else {
        onSubmit({
          name: nameRef.current.value,
          userAvatarUrl: `img/avatars/avatar-${Math.ceil(Math.random() * 10)}.jpg`,
          email: emailRef.current.value,
          password: passwordFirstRef.current.value,
        });
      }
    }
  };

  const re = /[0-9]{1,}[a-zA-Z]{1,}|[a-zA-Z]{1,}[0-9]{1,}/;

  return (
    <React.Fragment>
      <h1 className='visually-hidden'>Sign up</h1>

      <Header isContacts={false} isSignIn={false}/>

      <div className={styles.wrapper}>
        <form
          action="#"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.fields}>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder="Name"
                name="user-name"
                id="user-name"
                ref={nameRef}
              />
              <label className="visually-hidden" htmlFor="user-name">Name</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={emailRef}
              />
              <label className="visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="user-password-first"
                id="user-password-first"
                ref={passwordFirstRef}
                onChange={(evt) => {
                  if (re.test(evt.target.value)) {
                    evt.target.setCustomValidity('');
                    evt.target.reportValidity();
                  }
                }}
              />
              <label className="visually-hidden" htmlFor="user-password-first">Password</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm password"
                name="user-password-second"
                id="user-password-second"
                ref={passwordSecondRef}
                onChange={(evt) => {
                  if (re.test(evt.target.value)) {
                    evt.target.setCustomValidity('');
                    evt.target.reportValidity();
                  }
                }}
              />
              <label className="visually-hidden" htmlFor="user-password-second">Password</label>
            </div>
          </div>
          <div className={styles.submit}>
            <button
              className={styles.btn}
              type="submit"
            >Sign up
            </button>
          </div>
        </form>
      </div>

      <Footer />

    </React.Fragment>
  );
}

export default SignUp;
