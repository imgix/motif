Vue.component('page-url-field', {
  template: JST['templates/page-url-field'](),

  data: function() {
    return { pageUrl: 'hi' }
  },
  methods: {
    handleReturn: function() {
      // console.log(this.fullPageUrl);
      Vue.http.post('/pages', {
        authenticity_token: AUTH_TOKEN,
        url: this.fullPageUrl
      }).then(function(res) {
        console.log('success', res);
      }, function(res) {
        console.log('error', res);
      })
    }
  },
  computed: {
    fullPageUrl: function() {
      return this.pageUrl.match(/^https?:\/\//) ?
        this.pageUrl :
        'http://' + this.pageUrl
    }
  }
});
