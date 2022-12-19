<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)">
      </div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
          focus:outline-none" @click.prevent="newSong(song)" id="play-botton">
          <i class="fas fa-play"></i>
        </button>
        <div v-if="song" class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency')}}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{ $t('song.comment_count', comment_count , {count: comment_count})}}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div class="text-white text-center font-bold p-5 mb-4"
              v-if="comment_show_alert" :class="comment_alert_variant" >
                  {{comment_alert_message}}
          </div>
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field as="textarea" name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="comment_in_submition"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li class="p-6 bg-gray-50 border border-gray-200"
      v-for="songComment in sortedComments" :key="songComment.sid">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ songComment.name }}</div>
          <time>{{ songComment.datePosted }}</time>
        </div>

        <p>{{ songComment.content }}</p>
      </li>
    </ul>
  </main>
</template>
<!-- eslint-disable linebreak-style -->
<script>
import { ErrorMessage } from 'vee-validate';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SongPage',
  data() {
    return {
      song: {},
      songComments: [],
      sort: '1',
      comment_count: 0,
      schema: {
        comment: 'required|min:3',
      },
      comment_in_submition: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'pls wait! your comment is being added.',
    };
  },
  computed: {
    ...mapState(['songs', 'user', 'userLoggedIn', 'comments']),
    sortedComments() {
      return this.songComments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  created() {
    const songData = this.songs.find((el) => el.id === this.$route.params.id);
    if (!songData) {
      this.$router.push({ name: 'home' });
    }
    this.song = songData;

    const { sort } = this.$route.query;
    this.sort = sort === '1' || sort === '2' ? sort : '1';

    this.comments.forEach((cm) => {
      if (cm.sid === this.$route.params.id) {
        this.comment_count += 1;
        this.songComments.push(cm);
      }
    });
  },
  components: { ErrorMessage },
  methods: {
    ...mapActions(['newSong']),
    async addComment(values, { resetForm }) {
      this.comment_show_alert = true;
      this.comment_in_submition = true;
      this.comment_alert_variant = 'bg-blue-500';
      this.comment_alert_message = 'pls wait! your comment is being added.';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: this.user,
        comment_count: this.comment_count,
      };

      try {
        await this.$store.dispatch('addComment', comment);
      } catch (error) {
        this.comment_in_submition = false;
        return;
      }
      this.songComments.push(comment);
      this.comment_count += 1;
      this.comment_in_submition = false;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Succes! your comment has been added';
      resetForm();
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
