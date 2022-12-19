/* eslint-disable linebreak-style */
import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('Router', () => {
  test('renders router links', () => {
    const song = {
      id: 'abc',
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song', params: { id: song.id },
    });
  });
});
