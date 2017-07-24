import decode from 'jwt-decode';
import axios from 'axios';
import AppConfig from '../config';

const ID_TOKEN_KEY = 'id_token';

class AuthService {
  static login(username, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${AppConfig.API_BASE_URL}/api-token-auth/`, {
        username: username,
        password: password  
      })
      .then((response) => {
        AuthService.setIdToken(response.data.token);
        resolve(response); 
      })
      .catch((error) => reject(error));  
    })
  }

  static logout() {
    return new Promise((resolve) => {
      clearIdToken();
      resolve(); 
    });
  }

  static isUserAuthenticated() {
    const idToken = AuthService.getIdToken();
    return !!idToken && !isTokenExpired(idToken);
  }

  static requireAuth(nextState, replace) {
    if (!AuthService.isUserAuthenticated()) {
      replace({pathname: '/'});
    }
  }

  static getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  // Get and store id_token in local storage
  static setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  static getDecodedToken(encodedToken) {
    if (!AuthService.isUserAuthenticated()) {
      throw new Error('User it not authenticated');
    }
    return decode(encodedToken);  
  }
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export default AuthService;