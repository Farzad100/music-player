/* eslint-disable linebreak-style */
import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('snapshot songItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      id: 'abc',
      name: 'test',
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

    expect(wrapper.element).toMatchSnapshot();
  });
});
