/* eslint-disable linebreak-style */
import Home from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [
      {}, {}, {},
    ];
    Home.computed.mapState = () => false;
    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
      },
    });

    const items = component.findAllComponents(SongItem);
    expect(items).toHaveLength(songs.length);
    items.forEach((wrapper, i) => {
      expect(wrapper.computed().songs).toBe(songs[i]);
    });
  });
});
