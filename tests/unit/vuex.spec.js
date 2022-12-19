/* eslint-disable linebreak-style */
import { createStore } from 'vuex';
import auth from '@/store/index';

describe('vuex store', () => {
//   test('toggle auth mutation, set userLoggedIn to true', () => {
//     const store = createStore(auth);
//     expect(store.state.userLoggedIn).not.toBe(true);
//     // store.commit('toggleAuthModal');
//     // expect(store.state.userLoggedIn).toBe(true);
//   });
  test('login action sets userLoggedIn to true', async () => {
    const store = createStore(auth);
    expect(store.state.userLoggedIn).toBe(false);
    await store.dispatch('login', { email: '', password: '' });
    expect(store.state.userLoggedIn).toBe(true);
  });
});
