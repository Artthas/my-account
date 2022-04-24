import {combineReducers} from 'redux';
import {contactsData} from './contacts-data/contacts-data';
import {userData} from './user-data/user-data';

export enum NameSpace {
  Contacts = 'CONTACTS',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Contacts]: contactsData,
  [NameSpace.User]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
