<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.nom }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.token.substring(0, 20) }} ...
      {{ currentUser.token.substr(currentUser.token.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <!-- <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul> -->
  </div>
</template>

<script>
import jsonwebtoken from "jsonwebtoken";
export default {
  name: "Profile",
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      console.log("DEBUG currentUser profile page", user);
      const token = user.token;
      const decodedToken = jsonwebtoken.decode(token, { complete: true });
      console.log("DEBUG currentUser profile page", decodedToken);
      // return user;
      return {
        nom: decodedToken.payload.email,
        token: token,
        id: decodedToken.payload.id,
        email: decodedToken.payload.email,
      };
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
