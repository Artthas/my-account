import {UserData} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, requireLogout} from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userData};
