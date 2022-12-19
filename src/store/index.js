/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex';
import { Howl } from 'howler';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    user: '',
    email: '',
    password: '',
    allSongs: [],
    songs: [
      {
        id: '100M',
        name: 'Arash_Arash.mp3',
      },
    ],
    comments: [],
    curentSong: {},
    sound: {},
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      state.curentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    // addSong: (state) => {
    //   console.log(state);
    // },
  },
  // getters: {
  //   // authModalShow: (state) => state.authModalShow,
  // },
  actions: {
    async register({ commit }, payload) {
      this.state.email = payload.email;
      this.state.password = payload.password;
      this.state.user = payload.name;
      commit('toggleAuth');
      commit('toggleAuthModal');
    },
    login({ commit }) {
      commit('toggleAuthModal');
      this.state.userLoggedIn = true;
    },
    init_login({ commit }) {
      const user = this.state.email;

      if (user) {
        commit('toggleAuth');
      }
    },
    signout({ commit }) {
      commit('toggleAuth');
      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: 'home' });
      // }
    },
    uploadSong(state, payload) {
      payload.forEach((song) => {
        const equal = this.state.songs.find((el) => el.name === song.name);
        if (equal) {
          return;
        }
        this.state.songs.push(song);
      });
    },
    addComment(state, payload) {
      this.state.comments.push(payload);
    },
    newSong({ commit, state }, payload) {
      commit('newSong', payload);
      state.sound.play();
    },
  },
});
