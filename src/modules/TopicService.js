import axios from 'axios';
import AuthService from '../modules/AuthService';
import AppConfig from '../config';

const ENDPOINT = `${AppConfig.API_BASE_URL}/topics`;
class TopicService {
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
          return response.data; 
        })
        .then(resolve)
        .catch(reject);
    })
  }
}

export default TopicService;