import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://lebedev-danil-api.academy.smartworld.team/';
const API_URL = 'http://80.249.150.213/';
class TodoService {
  getLists() {
    return axios.get(API_URL + 'lists', {headers: authHeader()});
  }
  getTasks() {
    return axios.get(API_URL + 'task', {headers: authHeader()});
  }
  async createTask(data) {
    return await axios({
      method: 'POST',
      url: `${API_URL}task`,
      headers: authHeader(),
      data: data,
    });
  }
  async createList(data) {
    return await axios({
      method: 'POST',
      url: `${API_URL}lists/create`,
      headers: authHeader(),
      data: data,
    });
  }
  async deleteList(id) {
    return await axios({
      method: 'DELETE',
      url: `${API_URL}lists/delete/${id}`,
      headers: authHeader(),
    });
  }
  async deleteTask(id) {
    return await axios({
      method: 'DELETE',
      url: `${API_URL}task/delete/${id}`,
      headers: authHeader(),
    });
  }
  changeTask(task) {
    const data = {
      attributes: {
        name: task.name,
        lists_id: task.lists_id,
        urgency: task.urgency,
        is_completed: !task.is_completed,
      },
    };
    return axios({
      method: 'PUT',
      url: `${API_URL}task/update/${task.id}`,
      headers: authHeader(),
      data: data,
    });
  }
}
export default new TodoService();
