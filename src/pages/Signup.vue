<template>
  <form @submit.prevent="handleRegister">
    <div class="form-group" :class="{'form-group--error': v$.user.name.$error}">
      <label class="form__label">Логин</label>
      <input-add
        class="form__input"
        v-model.trim="v$.user.name.$model"
        type="text"
        name="name"
        placeholder="Введите имя"
        :class="{'is-invalid': v$.user.name.$error}"
      >
      </input-add>
    </div>
    <div class="error" v-if="!v$.user.name.required">Обязательное поле</div>
    <div class="error" v-if="!v$.user.name.minLength">
      Имя должно содержать больше
      {{ v$.user.name.$params.minLength.min }} символов.
    </div>
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
      <div class="error" v-if="!v$.user.name.required">Обязательное поле</div>
      <div class="error" v-if="!v$.user.email.email">
        Введите коректный email
      </div>
    </div>

    <div>
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
      <div
        class="form-group"
        :class="{'form-group--error': v$.repeatPassword.$error}"
      >
        <label class="form__label">Повторите пароль</label>
        <input
          class="form__input"
          v-model.trim="v$.repeatPassword.$model"
          placeholder="Повторите пароль"
        />
      </div>
      <div class="error" v-if="!v$.repeatPassword.sameAsPassword">
        Пароли должны быть идентичными.
      </div>
    </div>
    <label
      >Уже зарегистрированны?
      <router-link to="/login">Войти</router-link></label
    >
    <button-add
      class="button"
      type="submit"
      :disabled="submitStatus === 'PENDING'"
    >
      Зарегистрироваться
    </button-add>
    <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо за регистрацию!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">
      Пожалуйста заполните данные корректно
    </p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Отправка...</p>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, minLength, email, sameAs} from 'vuelidate/lib/validators';

import ButtonAdd from '../components/UI/ButtonAdd.vue';
// import {mapActions, mapGetters} from 'vuex';
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
        name: '',
      },
      repeatPassword: '',
      successful: false,
      loading: false,
      message: '',
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  // computed: {
  //   ...mapGetters(['GET_USER']),
  // },
  // methods: {
  //   ...mapActions(['SIGNUP']),
  //   checkForm() {
  //     this.v$.user.$touch();
  //     if (!this.v$.user.$error) {
  //       console.log('Валидация прошла успешно');
  //       this.SIGNUP(JSON.stringify(this.user));
  //     }
  //   },
  // },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.successful = false;
      this.loading = true;

      this.$store.dispatch('auth/register', this.user).then(
        (data) => {
          this.message = data.email;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        },
        this.$router.push('/login')
      );
    },
  },
};
</script>

<style>
.is-invalid {
  border: 1px solid red;
}
</style>
