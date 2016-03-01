(function() {
  var exampleURLs = [
    { url: 'http://qz.com/624490/explore-the-world-like-a-fish-with-the-best-underwater-photos-of-the-year', title: 'demo', accentColor: '168dd9', ogImageURL: 'https://qzprod.files.wordpress.com/2016/02/601marcusmarcusblatchford1.jpg?quality=80&strip=all&w=640', logoURL: 'https://logo.clearbit.com/qz.com?format=png&size=300', logoAlignment: 'bottom,right', textPosition: 'top', textAlignment: 'left', fontFamily: 'Avenir Next Demi,Bold', textColor: 'ffffff', logoPadding: 0, loading: false, error422: false },
    { url: 'http://www.polygon.com/features/2016/2/29/11134132/knights-and-bikes-interview-foam-sword-games-kickstarter', title: 'demo', accentColor: 'ffbcd2', ogImageURL: 'https://cdn0.vox-cdn.com/thumbor/rypCYxdJGnOhKQPrGaZZKlxQ17g=/0x0:1920x1080/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/48962515/KnightsBikes_11.0.0.png', logoURL: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Logo_of_Polygon.png', logoAlignment: 'top,center', textPosition: 'bottom', textAlignment: 'center', fontFamily: 'Avenir Next Demi,Bold', textColor: '1d1d1d', logoPadding: 70, loading: false, error422: false },
    { url: 'http://www.huffingtonpost.com/entry/harry-potter-world-hollywood-food_us_56cfaa4fe4b0871f60eae6b2', title: 'demo', accentColor: '2e7061', ogImageURL: 'http://img.huffingtonpost.com/asset/1200_630/56cff2b51e00002100702d42.jpeg?cache=ptljjywyyv', logoURL: 'https://logo.clearbit.com/www.huffingtonpost.com?format=png&size=300', logoAlignment: 'bottom,right', textPosition: 'top', textAlignment: 'left', fontFamily: 'Charter', textColor: 'ffffff', logoPadding: 0, loading: false, error422: false },
    { url: 'http://www.vox.com/2016/2/29/11132930/nuclear-power-costs-us-france-korea', title: 'demo', accentColor: '2e7061', ogImageURL: 'https://cdn0.vox-cdn.com/uploads/chorus_asset/file/6124695/shutterstock_125057837.0.jpg', logoURL: 'https://logo.clearbit.com/www.vox.com?format=png&size=300', logoAlignment: 'top,right', textPosition: 'bottom', textAlignment: 'right', fontFamily: 'Din Alternate,Bold', textColor: 'ffffff', logoPadding: 80, loading: false, error422: false },
    { url: 'http://www.apartmenttherapy.com/justins-old-new-austin-bungalow-228900', title: 'demo', accentColor: 'd2d2d2', ogImageURL: 'http://p-fst2.pixstatic.com/56cf2349dbfa3f177f00e08d/_w.1500_s.fit_/2.25.16%20austin%20living%20room%20.jpg', logoURL: 'http://advertising.apartmenttherapy.com/images/logo-at.png', logoAlignment: 'bottom,center', textPosition: 'top', textAlignment: 'center', fontFamily: 'Georgia', textColor: '2c2c2c', logoPadding: 50, loading: false, error422: false },
    { url: 'http://www.studioneat.com/products/tray', title: 'demo', accentColor: '515151', ogImageURL: 'http://cdn.shopify.com/s/files/1/0057/8492/products/TRAY_Hand_8fb7489f-37fd-44d6-987c-79942add9141_grande.jpg?v=1447866471', logoURL: 'https://cdn.shopify.com/s/files/1/0057/8492/t/5/assets/SN_logo_stroke_white.png', logoAlignment: 'bottom,right', textPosition: 'top', textAlignment: 'left', fontFamily: 'Avenir Next Demi,Bold', textColor: 'ffffff', logoPadding: 40, loading: false, error422: false }
  ];

  Vue.component('og-builder', {
    template: JST['templates/og-builder'](),
    props: {
      url: { type: String },
      title: { type: String, default: null },
      accentColor: { type: String },
      ogImageURL: { type: String },
      logoURL: { type: String },
      logoAlignment: { type: String, default: 'bottom,right' },
      textPosition: { type: String, default: 'top' },
      textAlignment: { type: String, default: 'left' },
      fontFamily: { type: String, default: 'Avenir Next Demi,Bold' },
      textColor: { type: String, default: 'ffffff' },
      logoPadding: { type: Number, default: 0 },
      loading: { type: Boolean, default: false },
      error422: { type: Boolean, default: false }
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

          that.url = res.data.url;
          that.title = res.data.title;
          that.accentColor = res.data.accent_color;
          that.ogImageURL = res.data.og_image_url;
          that.logoURL = res.data.logo_url;
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
        var selectedData = exampleURLs[~~(Math.random() * exampleURLs.length)];
        this.$data = selectedData;
        this.title = '';
      },
      handleRestartClick: function() {
        var that = this;
        this.$data = {
          url: null,
          title: null,
          accentColor: null,
          ogImageURL: null,
          logoURL: null,
          logoAlignment: 'bottom,right',
          textPosition: 'top',
          textAlignment: 'left',
          fontFamily: 'Avenir Next Demi,Bold',
          textColor: 'ffffff',
          logoPadding: 0,
          loading: false,
          error422: false
        };

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
