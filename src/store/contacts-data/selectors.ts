import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Contacts} from '../../types/contact';

export const getContacts = (state: State): Contacts => state[NameSpace.Contacts].contacts;

