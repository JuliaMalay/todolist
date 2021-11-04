<template>
  <form @submit.prevent="checkForm">
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
    <p v-for="error of v$.user.name.$errors" :key="error.$uid">
      некорректные данные
    </p>
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
        :class="{'form-group--error': v$.user.repeatPassword.$error}"
      >
        <label class="form__label">Repeat password</label>
        <input
          class="form__input"
          v-model.trim="v$.user.repeatPassword.$model"
          placeholder="Повторите пароль"
        />
      </div>
      <div class="error" v-if="!v$.user.repeatPassword.sameAsPassword">
        Passwords must be identical.
      </div>
    </div>
    <button-add
      class="button"
      type="submit"
      :disabled="submitStatus === 'PENDING'"
    >
      Submit!
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
import {required, minLength, email, sameAs} from 'vuelidate/lib/validators';

import ButtonAdd from '../ButtonAdd.vue';
export default {
  components: {ButtonAdd},
  setup() {
    return {v$: useVuelidate()};
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      repeatPassword: '',
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
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    checkForm() {
      this.v$.user.$touch();
      if (!this.v$.user.$error) {
        console.log('Валидация прошла успешно');
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
