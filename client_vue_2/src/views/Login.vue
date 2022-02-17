<template>
  <div class="col-md-12">
    <div class="card card-container">
      <v-img
        id="profile-img"
        alt="Image de profil"
        class="profile-img-card"
        contain
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      />
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form name="form" @submit.prevent="handleLogin">
          <!-- <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
            >
              Email requis !
            </div>
          </div> -->
          <!-- <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
            >
              Password is required!
            </div>
          </div> -->

          <v-container>
            <v-row>
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required"
                >
                  <v-text-field
                    v-model="user.email"
                    :counter="10"
                    :error-messages="errors"
                    label="Email"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                v-model="user.password"
                :counter="10"
                :error-messages="errors"
                label="Password"
                required
              ></v-text-field>
            </validation-provider>
          </v-row>
          <v-container>
            <v-row :justify="space - around">
              <v-btn type="submit" :disabled="invalid || loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Login</span>
              </v-btn>
              <v-btn @click="clear" class="ml-auto">
                clear
              </v-btn>
            </v-row>
          </v-container>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import User from '../models/UserAuth';
// import { required, email } from 'vee-validate/dist/rules.esm';
import {
  // extend,
  ValidationObserver,
  ValidationProvider
  // setInteractionMode
} from 'vee-validate';
// setInteractionMode('eager');
// extend('required', {
//   ...required,
//   message: '{_field_} can not be empty'
// });
// extend('email', {
//   ...email,
//   message: 'Email must be valid'
// });
export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs.observer
        .validate()

        // this.$validator.validateAll()
        .then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }

          if (this.user.email && this.user.password) {
            this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$router.push('/profile');
              },
              error => {
                this.loading = false;
                this.message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
              }
            );
          }
        });
    },
    clear() {
      this.email = '';
      this.password = '';
      this.$refs.observer.reset();
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
