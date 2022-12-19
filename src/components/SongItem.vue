<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
   <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
            duration-300 hover:bg-gray-50 snapshot" :class="`song-id-${song.id}`">
            <div>
              <router-link :to="{ name: 'song', params: { id: song.id }}"
              class="font-bold block text-gray-600 composition-name">
                {{song.name}}
              </router-link>
              <span class="text-gray-500 text-sm">{{song.genre}}</span>
            </div>

            <div class="text-gray-600 text-lg">
              <router-link custom
              :to="{ name: 'song', params: { id: song.id }, hash: '#comments'}"
              v-slot="{ navigate }">
                <span class="comments" @click="navigate">
                  <i class="fa fa-comments text-gray-600"></i>
                  {{ comment_count }}
                </span>
              </router-link>
            </div>
          </li>
</template>
<!-- eslint-disable linebreak-style -->
<script>
import { mapState } from 'vuex';

export default {
  name: 'SongItem',
  data() {
    return {
      comment_count: 0,
    };
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    song: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['comments']),
  },
  created() {
    this.comments.forEach((comment) => {
      if (this.song.id === comment.sid) {
        this.comment_count += 1;
      }
    });
  },
};
</script>
