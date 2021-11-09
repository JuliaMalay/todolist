<template>
  <div class="wrapperLogin">
    <form @submit.prevent="handleLogin" class="formLogin">
      <h4>Войти</h4>
      <div
        class="form-group"
        :class="{'form-group--error': v$.user.email.$error}"
      >
        <label for="email" class="form__label">E-mail</label>
        <input-add
          class="input"
          v-model.trim="v$.user.email.$model"
          type="text"
          name="email"
          id="email"
          placeholder="Введите email"
        >
        </input-add>
        <div class="error" v-if="!v$.user.email.email">
          Введите коректный email
        </div>
      </div>
      <div
        class="form-group"
        :class="{'form-group--error': v$.user.password.$error}"
      >
        <label for="password" class="form__label">Пароль</label>
        <input
          id="password"
          class="form__input input"
          v-model.trim="v$.user.password.$model"
          placeholder="Введите пароль"
        />
      </div>
      <div class="error" v-if="!v$.user.password.required">
        Password is required.
      </div>
      <div class="error" v-if="!v$.user.password.minLength">
        Password must have at least
        {{ v$.user.password.$params.minLength.min }} letters.
      </div>
      <div class="form-group">
        <label
          >Не зарегистрированны?<router-link to="/signup"
            >Регистрация</router-link
          ></label
        >
      </div>
      <button-add
        class="button"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Войти
      </button-add>

      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, minLength, email} from 'vuelidate/lib/validators';

import ButtonAdd from '../components/UI/ButtonAdd.vue';
import {mapActions, mapGetters} from 'vuex';
export default {
  components: {ButtonAdd},
  setup() {
    return {v$: useVuelidate()};
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  computed: {
    ...mapGetters(['GET_USER']),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/lists');
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    handleLogin() {
      this.v$.user.$touch();
      if (!this.v$.user.$error) {
        this.loading = true;
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/lists');
          },
          (error) => {
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
    },
  },
};
</script>

<style>
.is-invalid {
  border: 1px solid red;
}
.wrapperLogin {
  display: flex;
  min-height: 100vh;
  padding: 15px;
  justify-content: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.formLogin {
  border: 1px solid blue;
  max-height: 350px;
  padding: 20px;
  border-radius: 20px;
}
.form__input {
  border-radius: 25px;
  padding: 15px 30px;
  color: #0f7bff;
  border: 2px solid #0f7bff;
}
.button {
  padding: 15px 35px;
}
.input {
  width: 100%;
}
</style>
