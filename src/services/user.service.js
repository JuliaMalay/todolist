import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://lebedev-danil-api.academy.smartworld.team/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'User', {headers: authHeader()});
  }

  //   getModeratorBoard() {
  //     return axios.get(API_URL + 'mod', { headers: authHeader() });
  //   }

  //   getAdminBoard() {
  //     return axios.get(API_URL + 'admin', { headers: authHeader() });
  //   }
}

export default new UserService();
