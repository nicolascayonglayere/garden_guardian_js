<template>
  <div class="container">
    <b-card
      bg-variant="dark"
      header="Welcome to the Vue JWT App"
      text-variant="white"
      class="text-center"
    >
      <b-card-text>Register Here!</b-card-text>
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form
            class="text-center border border-primary p-5"
            style="
              margin-top: 70px;
              height: auto;
              padding-top: 100px !important;
            "
            @submit.prevent="registerUser"
          >
            <input
              type="text"
              id="nom"
              class="form-control mb-5"
              placeholder="Nom"
              v-model="register.nom"
              required
            />
            <input
              type="text"
              id="prenom"
              class="form-control mb-5"
              placeholder="Prenom"
              v-model="register.prenom"
              required
            />
            <input
              type="email"
              id="email"
              class="form-control mb-5"
              placeholder="Email"
              v-model="register.email"
              required
            />
            <input
              type="password"
              id="password"
              class="form-control mb-5"
              placeholder="Mot de passe"
              v-model="register.mot_de_passe"
            />
            <input
              type="text"
              id="secret"
              class="form-control mb-5"
              placeholder="Mot secret"
              v-model="register.mot_secret"
            />
            <p>
              Already have an account? Click
              <router-link to="/login">here</router-link> to sign in
              <center>
                <button
                  class="btn btn-primary btn-block w-75 my-4"
                  type="submit"
                >
                  Sign up
                </button>
              </center>
            </p>
          </form>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      register: {
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        mot_secret: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await Axios.post(
          "http://localhost:8181/inscription",
          this.register
        );
        console.log(response);
        if (response) {
          this.$router.push("/login");
          console("Success", "Registration Was successful", "success");
        } else {
          console.log("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let error = err.response;
        console.log(error);
      }
    },
  },
};
</script>
