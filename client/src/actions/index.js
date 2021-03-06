import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR } from './types';
/*
ActionCreators - create/return actions
- they are dispatched to different middlewars
- & eventually to reducers
Every action will have a type - when a reducer gets hit by an action
- based on it's type (switch statement) - will know what to do
*/

export const signUp = data => {
  /*
    1. use the data & make HTTP req to BE & send it along [x]
    2. take the BE response (jwtToken) [x]
    3. dispatch message: user just signed up [x]
    4. save jwtToken into our localStorage [x]
  */
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

        localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (error) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email is already in use'
        });
    }
  }
}
