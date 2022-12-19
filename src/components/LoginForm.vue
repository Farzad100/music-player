<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div>
        <div class="text-white text-center font-bold p-5 mb-4"
            v-if="login_show_alert" :class="login_alert_variant" >
                {{login_alert_message}}
        </div>
        <vee-form :validation-schema="loginSchema"
          @submit="login">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field type="password" name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
                <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button type="submit" :disabled="login_in_submition"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
        </vee-form>
    </div>

</template>
<!-- eslint-disable linebreak-style -->
<script>

export default {
  name: 'AppLoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:14',
      },
      login_in_submition: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'pls wait! your account is loging you in.',

    };
  },
  methods: {
    login(values) {
      this.login_show_alert = true;
      this.login_in_submition = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_message = 'pls wait! your account is loging you in.';

      if (this.$store.state.email === values.email
      && this.$store.state.password === values.password) {
        this.login_alert_variant = 'bg-green-500';
        this.login_alert_message = 'Succes! your account has been login';
        // window.location.reload();
        this.$store.dispatch('login', values);
        this.login_show_alert = false;
        this.login_in_submition = false;
      } else {
        this.login_in_submition = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_message = 'Invalid login details';
      }
    },
  },
};
</script>
