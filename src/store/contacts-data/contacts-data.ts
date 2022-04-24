import {ContactsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {addContact, loadContacts, deleteContact} from '../action';

const initialState: ContactsData = {
  contacts: [],
};

const contactsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadContacts, (state, action) => {
      state.contacts = action.payload;
    })
    .addCase(addContact, (state, action) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      index !== -1 ? state.contacts.splice(index, 0, action.payload) : state.contacts.push(action.payload);
    })
    .addCase(deleteContact, (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
    });
});

export {contactsData};
