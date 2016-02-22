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
    },
    logoURL: {
      type: String,
      default: null
    },
    logoAlignment: {
      type: String,
      default: 'bottom,right'
    },
    textPosition: {
      type: String,
      default: 'top'
    },
    textAlignment: {
      type: String,
      default: 'left'
    },
    fontFamily: {
      type: String,
      default: 'Avenir Next Demi,Bold'
    },
    logoPadding: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
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
      that.loading = true;

      Vue.http.post('/pages', {
        authenticity_token: AUTH_TOKEN,
        url: this.fullURL
      }).then(function(res) {
        that.loading = false;

        that.id = res.data.id;
        that.url = res.data.url;
        that.title = res.data.title;
        that.description = res.data.description;
        that.accentColor = res.data.accent_color;
        that.ogImageURL = res.data.og_image_url;
        that.logoURL = res.data.logo_url;
        that.fetchedAt = res.data.fetched_at;
      }, function(res) {
        that.loading = false;

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
    encodedLogoURL: function() {
      return encodeURIComponent(this.logoURL);
    },
    encodedLogoAlignment: function() {
      return encodeURIComponent(this.logoAlignment);
    },
    encodedTextAlignment: function() {
      return encodeURIComponent(this.textPosition + ',' + this.textAlignment);
    },
    fullImageURL: function() {
      return [
        location.protocol,
        '//',
        location.host,
        '/i?url=',
        this.fullEncodedURL,
        '&image_url=',
        this.encodedOgImageURL,
        '&color=',
        this.accentColor,
        '&logo_url=',
        this.encodedLogoURL,
        '&logo_alignment=',
        this.encodedLogoAlignment,
        '&text_alignment=',
        this.encodedTextAlignment,
        '&logo_padding=',
        this.logoPadding,
        '&font_family=',
        this.fontFamily
      ].join('')
    },
    facebookImageURL: function() {
      return this.fullImageURL + '&format=facebook'
    }
  }
});
