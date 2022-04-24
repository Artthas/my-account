import {ActionType} from '../types/action';
import {Contact, Contacts} from '../types/contact';
import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus} from '../const';

export const loadContacts = createAction(
  ActionType.LoadContacts,
  (contacts: Contacts) => ({
    payload: contacts,
  }),
);

export const addContact = createAction(
  ActionType.AddContact,
  (addingContact: Contact) => ({
    payload: addingContact,
  }),
);

export const deleteContact = createAction(
  ActionType.DeleteContact,
  (deletingContact: Contact) => ({
    payload: deletingContact,
  }),
);


export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);
