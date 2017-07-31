import axios from 'axios';
import AuthService from '../modules/AuthService';
import AppConfig from '../config';

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
        .then((response) => {
          let data = response.data;
          data.favorite_topics = data.favorite_topics.map((d) => {
            d['id'] = parseInt(resourceId(d['url']), 10);
            return d;
          });
          return response;
        })
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

        // .then((httpResponse) => JSON.parse(httpResponse.response))
        // .then((data) => data.results.map((d) => Bill.fromObject(d)))
        // // bugfix
        // .then((data) => data.map((d) => {
        //   if (d.sponsor !== null) {
        //     d.sponsor = Util.urlPop(d.sponsor);
        //   }
        //   if (d.co_sponsor !== null) {
        //     d.co_sponsor = Util.urlPop(d.co_sponsor);
        //   }
        //   return d;
        // }))
        // .then(resolve)
        // .catch(reject);

/**
 * Return the last part of a URL
 * @param  {String} url string
 * @return {String}
 */
function resourceId(url) {
  const t = url.split('/')
    .filter((t) => t !== '')
    .pop();
  return t;
}

export default ProfileService;