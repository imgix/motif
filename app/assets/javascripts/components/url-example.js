Vue.component('url-example', {
  template: JST['templates/url-example'](),
  props: {
    url: {
      type: String,
      default: null,
    },
    urlPlaceholder: {
      type: String,
      default: null
    },
    imageUrlPlaceholder: {
      type: String,
      default: null
    }
  },
  computed: {
    splitUrl: function() {
      return this.url.split('URL_PLACEHOLDER');
    }
  }
});
