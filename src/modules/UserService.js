import axios from 'axios';
import AuthService from '../modules/AuthService';
import AppConfig from '../config';

const ENDPOINT = `${AppConfig.API_BASE_URL}/users`;
class UserService {
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
  }

  static update(profile) {
  }

  static delete(profile) {
  }
}

export default UserService;