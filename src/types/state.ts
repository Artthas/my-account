import {Contacts} from './contact';
import {RootState} from '../store/root-reducer';
import {AuthorizationStatus} from '../const';

export type ContactsData = {
  contacts: Contacts,
}

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

export type State = RootState;
