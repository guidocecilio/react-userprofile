import axios from 'axios';
import AuthService from '../modules/AuthService';
import AppConfig from '../config';
import { resourceId } from './utils';

const ENDPOINT = `${AppConfig.API_BASE_URL}/profiles`;
class ProfileService {
  static get config() {
    return {
      baseURL: ENDPOINT,
      headers: {
        'Authorization': `JWT ${AuthService.getIdToken()}`
      }
    };
  }
  static get() {
    return new Promise((resolve, reject) => {
      axios.get('/', ProfileService.config)
        .then((response) => {
          resolve(response); 
        })
        .catch((error) => reject(error));
    })
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`/${id}`, ProfileService.config)
        .then((response) => response.data)
        .then(resolve)
        .catch(reject);
    })
  }

  static update(profile) {
    return new Promise((resolve, reject) => {
      axios.put(`/${profile.id}/`, profile, ProfileService.config)
        .then(resolve)
        .catch(reject);  
    })
  }
}

export default ProfileService;