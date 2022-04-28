import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  LoadContacts = 'contacts/loadContacts',
  LoadPostContactId = 'contacts/loadPostContactId',
  AddContact = 'contacts/addContact',
  DeleteContact = 'contacts/deleteContact',
  RedirectToRoute = 'guitars/redirectToRoute',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  UserAuthorization = 'user/userAuthorization',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
