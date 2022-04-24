import SCSS from './Sign-in.module.scss';
import Footer from '../footer/Footer';
import {SignInData} from '../../types/sign-in-data';
import {fetchContactsAction, signInAction} from '../../store/api-actions';
import {useRef, FormEvent} from 'react';
import {AppRoute} from '../../const';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Header from '../header/Header';

function SignIn(): JSX.Element {

  const dispatch = useDispatch();

  const onSuccess = () => {
    dispatch(fetchContactsAction());
    history.push(AppRoute.Root);
  };

  const onSubmit = (signInData: SignInData) => {
    dispatch(signInAction(signInData, onSuccess));
  };

  const history = useHistory();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (passwordRef.current && emailRef.current) {
      if (!re.test(passwordRef.current.value)) {
        passwordRef.current.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры.');
        passwordRef.current.reportValidity();
      } else {
        onSubmit({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };

  const re = /[0-9]{1,}[a-zA-Z]{1,}|[a-zA-Z]{1,}[0-9]{1,}/;

  return (
    <div className={SCSS['user-page']}>

      <Header isContacts={false} isSignIn headerTitle={'user-page__head'}/>

      <div className={SCSS['user-page__content']}>
        <form
          action="#"
          className={SCSS['sign-in__form']}
          onSubmit={handleSubmit}
        >
          <div className={SCSS['sign-in__fields']}>
            <div className={SCSS['sign-in__field']}>
              <input
                className={SCSS['sign-in__input']}
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={emailRef}
              />
              <label className="visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={SCSS['sign-in__field']}>
              <input
                className={SCSS['sign-in__input']}
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
                onChange={(evt) => {
                  if (re.test(evt.target.value)) {
                    evt.target.setCustomValidity('');
                    evt.target.reportValidity();
                  }
                }}
              />
              <label className="visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className={SCSS['sign-in__submit']}>
            <button
              className={SCSS['sign-in__btn']}
              type="submit"
            >Sign in
            </button>
          </div>
        </form>
        <div className={SCSS['sign-up']}>
          <Link className={SCSS['sign-up__link']} to={AppRoute.SignUp}>
            If you don't have account you must SIGN UP
          </Link>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default SignIn;
