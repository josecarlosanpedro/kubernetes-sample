import * as Types from './home.types';
import notification from 'antd/lib/notification'
import { Observable } from 'rxjs';
import { getUsersSucceeded } from './home.actions'
import { apiEndpoint } from '../../../utils/contants'

export const getUsersEpic = action$ =>
  action$.ofType(Types.GET_USERS_EPIC).switchMap(action => {
    const options = {
      method: "GET",
      url: `${apiEndpoint}/api/users`,
      headers: { 'Content-Type': 'application/json' }
    };
    const request = Observable.ajax(options)
      .map(result => {
        if (result.response.errors) {
          notification.error({
            message: 'Cannot get users',
            description: "error"
          })
          return
        }
        return getUsersSucceeded(result.response.users)
      })
      .catch(error => {
        console.log(error)
        return error
      })
    return request

  })
