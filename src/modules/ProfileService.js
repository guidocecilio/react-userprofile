import axios from 'axios';
import AuthService from '../modules/AuthService';
import AppConfig from '../config';

const ENDPOINT = `${AppConfig.API_BASE_URL}/profiles`;
class ProfileService {
  static get() {
    return new Promise((resolve, reject) => {
      let config = {
        baseURL: ENDPOINT,
        headers: {
          'Authorization': `JWT ${AuthService.getIdToken()}`
        }
      }
      axios.get('/', config)
        .then((response) => {
          resolve(response); 
        })
        .catch((error) => reject(error));
    })
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      let config = {
        baseURL: ENDPOINT,
        headers: {
          'Authorization': `JWT ${AuthService.getIdToken()}`
        }
      }
      axios.get(`/${id}`, config)
        .then((response) => {
          resolve(response); 
        })
        .catch((error) => reject(error));
    })
  }

  static create(profile) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api-token-auth/`, {
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

  static update(profile) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api-token-auth/`, {
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

  static delete(profile) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api-token-auth/`, {
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
}

export default ProfileService;