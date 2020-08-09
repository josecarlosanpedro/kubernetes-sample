import jwt from 'jsonwebtoken';
export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getIsLogin = () => localStorage.getItem('login');

export const getUserId = () => {
  let userId = '';
  if (getToken()) {
    userId = jwt.verify(getToken(), 'mysecret').id;
  }
  return userId;
};