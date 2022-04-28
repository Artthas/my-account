import {ContactsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadContacts, loadPostContactId} from '../action';

const initialState: ContactsData = {
  contacts: [],
  postContactId: "",
};

const contactsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadContacts, (state, action) => {
      state.contacts = action.payload;
    })
    .addCase(loadPostContactId, (state, action) => {
      state.postContactId = action.payload;
    })
});

export {contactsData};
