import axios from 'axios';

// const API_URL = 'http://lebedev-danil-api.academy.smartworld.team/';
const API_URL = 'http://80.249.150.213/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'User/login', {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.access_token) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(response.data.data));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'User/register', {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
