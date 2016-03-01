(function() {
  var exampleURLs = [
    'http://qz.com/624490/explore-the-world-like-a-fish-with-the-best-underwater-photos-of-the-year/',
    'http://www.polygon.com/features/2016/2/29/11134132/knights-and-bikes-interview-foam-sword-games-kickstarter',
    'http://www.huffingtonpost.com/entry/harry-potter-world-hollywood-food_us_56cfaa4fe4b0871f60eae6b2',
    'http://www.vox.com/2016/2/29/11132930/nuclear-power-costs-us-france-korea',
    'http://www.apartmenttherapy.com/justins-old-new-austin-bungalow-228900',
    'http://www.studioneat.com/products/tray'
  ];

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
      textColor: {
        type: String,
        default: 'ffffff'
      },
      logoPadding: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      error422: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      error422: function(oldVal, newVal) {
        var that = this;

        setTimeout(function() {
          that.error422 = false;
        }, 480);
      }
    },
    methods: {
      handleURLSubmit: function() {
        var that = this;

        if (!that.url) {
          return;
        }

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

          if (res.status == 422) {
            that.error422 = true;
          } else {
            alert('Uh oh! Something went wrong. We\'re looking into it.');
          }

          console.error(res);
        });
      },
      submitRandomURL: function() {
        // this.url =
      },
      handleRestartClick: function() {
        var that = this;

        this.title = null;
        this.url = null;

        // Defer focus back to `urlInput`
        setTimeout(function() {
          that.$els.urlInput.focus();
        }, 0);
      },
      selectFullURL: function(e) {
        e.target.select();
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
      encodedFontFamily: function() {
        return encodeURIComponent(this.fontFamily);
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
      cleanedAccentColor: function() {
        return this.accentColor.replace('#', '');
      },
      cleanedTextColor: function() {
        return this.textColor.replace('#', '');
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
          this.cleanedAccentColor,
          '&logo_url=',
          this.encodedLogoURL,
          '&logo_alignment=',
          this.encodedLogoAlignment,
          '&text_alignment=',
          this.encodedTextAlignment,
          '&logo_padding=',
          this.logoPadding,
          '&font_family=',
          this.encodedFontFamily,
          '&text_color=',
          this.cleanedTextColor
        ].join('')
      },
      facebookImageURL: function() {
        return this.fullImageURL + '&format=facebook'
      },
      exampleImageURL: function() {
        var exampleURL = this.fullImageURL.
          replace(this.fullEncodedURL, 'URL_PLACEHOLDER').
          replace(this.encodedOgImageURL, 'URL_PLACEHOLDER');

        return exampleURL;
      }
    }
  });
}());

