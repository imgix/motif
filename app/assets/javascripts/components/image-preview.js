Vue.component('image-preview', {
  template: JST['templates/image-preview'](),
  props: {
    url: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    url: function() {
      this.loading = true;
    }
  },
  methods: {
    handleLoad: function() {
      this.loading = false;
    },
    handleError: function() {
      this.$dispatch('image-load-error');
    }
  }
});
