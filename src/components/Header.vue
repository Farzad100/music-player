<!-- eslint-disable linebreak-style -->
<template>
    <!-- Header -->
<header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4"
      :to="{ name: 'home' }" exact-active-class="no-active">
        Music
      </router-link>
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link :to="{ name: 'about' }" class="px-2 text-white">About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" @click.prevent="toggleAuthModal" href="#">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" @click.prevent="signout" href="#">logout</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{currentLocale}}
            </a>
          </li>
        </ul>
      </div>
    </nav>
</header>
</template>
<!-- eslint-disable linebreak-style -->

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
    currentLocale() {
      // eslint-disable-next-line no-return-assign, vue/no-side-effects-in-computed-properties
      return this.$i18n.locale === 'ir' ? 'Persion' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout', {
        route: this.$route,
        router: this.$router,
      });
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ir' ? 'en' : 'ir';
    },
  },
};
</script>
