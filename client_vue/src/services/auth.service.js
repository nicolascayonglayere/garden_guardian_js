import axios from "axios";

const API_URL = "http://localhost:8181";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "/login", {
        email: user.email,
        mot_de_passe: user.mot_de_passe,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "inscription", {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mot_de_passe: user.mot_de_passe,
      mot_secret: user.mot_secret,
    });
  }
}

export default new AuthService();
