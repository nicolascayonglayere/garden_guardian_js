<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">
        You are currently viewing the Vue_JWT_App
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>{{ user.firstname }} | </b-nav-text>
        <b-nav-item @click="logUserOut" active>Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">
                Name : {{ user.firstname }} {{ user.lastname }}
              </li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Axios from "axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserDetails() {
      // get token from localstorage
      let token = localStorage.getItem("user");
      try {
        //decode token here and attach to the user object
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      } catch (error) {
        // return error in production env
        console.log(error, "error from decoding token");
      }
    },
    async logUserOut() {
      let token = localStorage.getItem("user");
      const headers = {
        Authorization: "Bearer " + token,
        // "x-access-token": token,
        "Content-Type": "application/json",
      };

      let response = await Axios.get("http://localhost:8181/logout", {
        headers: headers,
      });
      console.log("DEBUG ", response);
      if (response) {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>
<style>
#navbar {
  margin-bottom: 15px;
}
</style>
