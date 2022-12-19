<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->

<template>
    <div>
        <div class="border border-gray-200 p-3 mb-4 rounded">
              <div v-show="!showForm">
                <h4 class="inline-block text-2xl font-bold">{{song.name}}</h4>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                @click.prevent="deleteItem(index)">
                  <i class="fa fa-times"></i>
                </button>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                 @click.prevent="toggleForm">
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div v-show="showForm">
                <div class="text-white text-center font-bold p-5 mb-4"
                v-if="show_alert" :class="alert_variant" >
                  {{alert_message}}
                </div>
                <vee-form :validation-schema="schema"
                @submit="edit">
                  <div class="mb-3">
                    <label class="inline-block mb-2">name</label>
                    <vee-field type="text" name="modified_name" v-model="songName"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title"
                      @input="updateUnsavedFlag(true)" />
                      <ErrorMessage class="text-red-600" name="modified_name" />
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre" v-model="songGenre"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre"
                      @input="updateUnsavedFlag(true)"/>
                      <ErrorMessage class="text-red-600" name="genre" />
                  </div>
                  <button :disabled="!in_submission" type="submit"
                   class="py-1.5 px-3 rounded text-white bg-green-600">
                    Submit
                  </button>
                  <button @click.prevent="showForm = !showForm"
                  type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">
                    Go Back
                  </button>
                </vee-form>
              </div>
          </div>
    </div>
</template>
<!-- eslint-disable linebreak-style -->
<script>
export default {
  name: 'CompositionItems',
  props: {
    song: {
      type: Object,
      required: true,
    },
    // songs: {
    //   type: Object,
    //   required: true,
    // },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    deleteItem: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      genre: '',
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'pls wait! your edit is progressing',
      in_submission: false,
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces',
      },
      songName: this.song.name,
      songGenre: this.song.genre,
    };
  },
  methods: {
    edit(values) {
      // this.song.name = values.modified_name;
      // eslint-disable-next-line vue/no-mutating-props
      // this.songs[this.songs.length - 1].name = values.modified_name;
      // console.log(values);
      // this.$emit('editSong', values);
      // eslint-disable-next-line vue/no-mutating-props
      this.song.genre = this.genre;
      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);
      this.show_alert = true;
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'success';
    },
    // deleteSong() {
    //   this.$emit('deleteItem');
    // },
    toggleForm() {
      this.showForm = !this.showForm;
      this.show_alert = false;
      this.in_submission = true;
    },
  },
};

</script>
