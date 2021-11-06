<template>
  <form @submit.prevent="handleLogin">
    <div
      class="form-group"
      :class="{'form-group--error': v$.user.email.$error}"
    >
      <label class="form__label">E-mail</label>
      <input-add
        v-model.trim="v$.user.email.$model"
        type="text"
        name="email"
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
      <label class="form__label">Пароль</label>
      <input
        class="form__input"
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
    <label
      >Не зарегистрированны?<router-link to="/signup"
        >Регистрация</router-link
      ></label
    >
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
      this.$router.push('/Lists');
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    // checkForm() {
    //   this.v$.user.$touch();
    //   if (!this.v$.user.$error) {
    //     console.log('Валидация прошла успешно');
    //     this.LOGIN(JSON.stringify(this.user));
    //   }
    // },
    handleLogin() {
      this.v$.user.$touch();
      if (!this.v$.user.$error) {
        console.log('Валидация прошла успешно');

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
</style>
