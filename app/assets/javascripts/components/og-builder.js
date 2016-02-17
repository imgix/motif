Vue.component('og-builder', {
  template: JST['templates/og-builder'](),
  props: {
    id: {
      type: Number,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    accentColor: {
      type: String,
      default: null
    },
    fetchedAt: {
      type: String,
      default: null
    },
    ogImageURL: {
      type: String,
      default: null
    }
  },
  watch: {
    fetchedAt: function(val, oldVal) {
      // start watcher loop
    }
  },
  methods: {
    handleReturn: function() {
      var that = this;

      Vue.http.post('/pages', {
        authenticity_token: AUTH_TOKEN,
        url: this.fullURL
      }).then(function(res) {
        that.id = res.data.id;
        that.url = res.data.url;
        that.title = res.data.title;
        that.description = res.data.description;
        that.accentColor = res.data.accent_color;
        that.ogImageURL = res.data.og_image_url;
        that.fetchedAt = res.data.fetched_at;
      }, function(res) {
        alert('Something went wrong: ' + res.status);
        console.error(res);
      });
    }
  },
  computed: {
    fullURL: function() {
      return this.url.match(/^https?:\/\//) ?
        this.url :
        'http://' + this.url
    },
    fullEncodedURL: function() {
      return encodeURIComponent(this.fullURL);
    },
    encodedOgImageURL: function() {
      return encodeURIComponent(this.ogImageURL);
    },
    harmonyURL: function() {
      return [
        location.protocol,
        '//',
        location.host,
        '/i?url=',
        this.fullEncodedURL,
        '&image_url=',
        this.encodedOgImageURL,
        '&color=',
        this.accentColor
      ].join('')
    }
  }
});
