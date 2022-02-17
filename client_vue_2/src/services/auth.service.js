import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8181/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        mot_de_passe: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  async logout(user) {
    await axios
      .get(API_URL + 'logout', { headers: authHeader(user) })
      .then(response => {
        if (response.status !== '401') {
          localStorage.removeItem('user');
        }
      });
  }

  register(user) {
    return axios.post(API_URL + 'inscription', {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mot_de_passe: user.mot_de_passe,
      mot_secret: user.mot_secret
    });
  }
}

export default new AuthService();
