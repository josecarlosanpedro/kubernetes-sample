import { handleActions } from 'redux-actions';
import * as ACTION from './home.actions';
import Model from './home.model';

export default handleActions(
  {
    [ACTION.getUsersSucceeded]: (state, action) => ({
      ...state,
      users: action.payload,
      isLoading: false
    }),
    [ACTION.getUsersReading]: (state, action) => ({
      ...state,
      isLoading: true
    }),
  },
  Model,
);
