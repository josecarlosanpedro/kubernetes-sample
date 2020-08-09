import { createAction } from 'redux-actions';
import * as TYPE from './home.types';

export const getUsersEpics = createAction(
  TYPE.GET_USERS_EPIC,
);

export const getUsersSucceeded = createAction(
  TYPE.GET_USERS_SUCCEEDED,
);

export const getUsersFailed = createAction(
  TYPE.GET_USERS_FAILED,
);

export const getUsersCancel = createAction(
  TYPE.GET_USERS_CANCEL,
);

export const getUsersReading = createAction(
  TYPE.GET_USERS_READING,
);