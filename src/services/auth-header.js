export default function authHeader() {
  let token = JSON.parse(localStorage.getItem('token'));
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && token.access_token) {
    return {Authorization: 'Bearer ' + token.access_token};
  } else {
    return {};
  }
}
