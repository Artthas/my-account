import {contactsData} from './contacts-data';
import {makeFakeContact} from '../../utils/mocks';
import {addContact, deleteContact, loadContacts} from '../action';

const contacts = [...new Array(10)].map((_, idx) => makeFakeContact(idx + 1));
const addingContact = makeFakeContact(1);
const deletingContact = makeFakeContact(1);

describe('Reducer: contactsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(contactsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        contacts: [],
      });
  });

  it('should update contacts by load contacts', () => {
    const state = {
      contacts: [],
    };
    expect(contactsData(state, loadContacts(contacts)))
      .toEqual({
        contacts,
      });
  });

  it('should update contact by adding contact', () => {
    const state = {
      contacts: [],
    };
    expect(contactsData(state, addContact(addingContact)))
      .toEqual({
        contacts: [addingContact],
      });
  });

  it('should delete contacts by deleting contact', () => {
    const state = {
      contacts: contacts,
    };
    const newContacts = contacts.filter((contact) => contact.id !== deletingContact.id);
    expect(contactsData(state, deleteContact(deletingContact)))
      .toEqual({
        contacts: newContacts,
      });
  });
});


