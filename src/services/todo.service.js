import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://lebedev-danil-api.academy.smartworld.team/';

class TodoService {
  getLists() {
    return axios.get(API_URL + 'lists', {headers: authHeader()});
  }
  getTasks() {
    return axios.get(API_URL + 'task', {headers: authHeader()});
  }
  // createTask(task) {
  //   return axios.post(
  //     API_URL + 'task/create',
  //     {
  //       headers: authHeader(),
  //     },
  //     {attributes: task}
  //   );
  // }
  createTask(data) {
    console.log(data);

    return axios({
      method: 'POST',
      url: `${API_URL}task/create`,
      headers: authHeader(),
      data: data,
    })
      .then((response) => JSON.stringify(response))
      .then((response) => console.log(response));
  }
}
export default new TodoService();
