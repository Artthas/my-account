import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {makeFakeContact} from '../utils/mocks';
import {fetchContactsAction, postContactAction} from './api-actions';
import {loadContacts} from './action';

describe('Async actions', () => {
  const fakeRequireAuthorization = jest.fn();
  const api = createAPI(fakeRequireAuthorization());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Contacts when GET /contacts', async () => {
    const mockContacts = [...new Array(10)].map((_, idx) => makeFakeContact(idx + 1));
    mockAPI
      .onGet(APIRoute.Contacts)
      .reply(200, mockContacts);

    const store = mockStore();
    await store.dispatch(fetchContactsAction());

    expect(store.getActions()).toEqual([
      loadContacts(mockContacts),
    ]);
  });

  it('should dispatch Load_Contacts when POST /contacts and GET /contacts', async () => {
    const mockContact = makeFakeContact(1);
    const mockContacts = [...new Array(10)].map((_, idx) => makeFakeContact(idx + 1));
    const onSuccess = jest.fn();
    mockAPI
      .onPost(APIRoute.Contacts)
      .reply(200, mockContacts);

    const store = mockStore();
    await store.dispatch(postContactAction(mockContact, onSuccess));
    mockContacts.push(mockContact);

    expect(store.getActions()).toEqual(mockContacts);

    mockAPI
      .onGet(APIRoute.Contacts)
      .reply(200, mockContacts);

    await store.dispatch(fetchContactsAction());

    expect(store.getActions()).toEqual([
      loadContacts(mockContacts),
    ]);
  });
});
