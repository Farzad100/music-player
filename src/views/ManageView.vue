<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <main>
    <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs')}}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <!-- <composition-items :songs="songs" v-for="(song, i) in songs" :key="song.name"
             @deleteItem="deleteMusic(i)" @editSong="editNameSong" /> -->
             <composition-items :song="song" v-for="(song, i) in songs" :key="song.name"
             :deleteItem="deleteItem" :updateSong="updateSong" :index="i"
             :updateUnsavedFlag="updateUnsavedFlag" />
          </div>
        </div>
      </div>
    </div>
    </section>
  </main>
</template>
<!-- eslint-disable linebreak-style -->
<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import CompositionItems from '@/components/CompositionItems.vue';
import { mapState } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'manage',
  components: {
    AppUpload,
    CompositionItems,
  },
  data() {
    return {
      unsavedFlag: false,
    };
  },
  computed: {
    ...mapState(['songs']),
  },
  methods: {
    deleteItem(i) {
      this.songs.splice(i, 1);
    },
    updateSong(i, values) {
      this.songs[i].name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const leave = confirm('You have unsaved change! are you sure to leave');
      next(leave);
    }
  },
};
</script>
