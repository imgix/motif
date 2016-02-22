Vue.component('color-picker-input', {
  template: JST['templates/color-picker-input'](),
  props: {
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    hashColor: {
      get: function() {
        return this.color[0] == '#' ? this.color : '#' + this.color;
      },
      set: function(newVal) {
        this.color = newVal.replace('#', '');
      }
    }
  }
});
