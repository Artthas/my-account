import {ThunkActionResult} from '../types/action';
import {loadContacts, requireAuthorization, requireLogout} from './action';
import {APIRoute, AuthorizationStatus} from '../const';
import {Contacts, Contact, ContactPost} from '../types/contact';
import {toast} from 'react-toastify';
import {dropToken, saveToken, getToken, Token} from '../services/token';
import {dropUserAvatarUrl, saveUserAvatarUrl} from '../services/user-avatar-url';
import {AxiosError} from 'axios';
import {SignUpData} from '../types/sign-up-data';
import {SignInData} from '../types/sign-in-data';

type postContactCbType = () => void;
type signinCbType = () => void;
type signupCbType = () => void;

export const fetchContactsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Contacts>(`/660${APIRoute.Contacts}`, {headers: {Authorization: 'Bearer ' + getToken()}});
      dispatch(loadContacts(data.reverse()));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      toast.info('Сервер недоступен');
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const postContactAction = ({id, name, image}: Contact, onSuccess: postContactCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post<Contacts>(APIRoute.Contacts, {id, name, image});
      const {data} = await api.get<Contacts>(`/660${APIRoute.Contacts}`, {headers: {Authorization: 'Bearer ' + getToken()}});
      dispatch(loadContacts(data.reverse()));
      onSuccess();
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const editContactAction = (contactId: string, {name, image}: ContactPost, onSuccess: postContactCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.patch(`${APIRoute.Contacts}/${contactId}`, {name, image});
      const {data} = await api.get<Contacts>(`/660${APIRoute.Contacts}`, {headers: {Authorization: 'Bearer ' + getToken()}});
      dispatch(loadContacts(data.reverse()));
      onSuccess();
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const deleteContactAction = (contactId: string, onSuccess: postContactCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete(`${APIRoute.Contacts}/${contactId}`);
      const {data} = await api.get<Contacts>(`/660${APIRoute.Contacts}`, {headers: {Authorization: 'Bearer ' + getToken()}});
      dispatch(loadContacts(data.reverse()));
      onSuccess();
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const signUpAction = ({name, userAvatarUrl, email, password}: SignUpData, onSuccess: signupCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data: {accessToken}} = await api.post<{accessToken: Token}>(APIRoute.SignUp, {email, password, name, userAvatarUrl});
      saveToken(accessToken);
      saveUserAvatarUrl(userAvatarUrl);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      onSuccess();
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const signInAction = ({email, password}: SignInData, onSuccess: signinCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<{accessToken: Token, user: SignUpData}>(APIRoute.SignIn, {email, password});
      saveToken(data.accessToken);
      saveUserAvatarUrl(data.user.userAvatarUrl);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      onSuccess();
    } catch(error) {
      const {response} = error as AxiosError;
      if (response?.status === 400) {
        toast.info('Несуществующая почта');
      } else {
        toast.info('Сервер недоступен');
      }
    }
  };


export const signOutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.SignIn);
    dropToken();
    dropUserAvatarUrl();
    dispatch(requireLogout());
  };
