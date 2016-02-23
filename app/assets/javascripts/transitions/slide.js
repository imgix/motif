Vue.transition('slide', {
  enter: function(el) {
    el.style.height = 'auto';
    var endHeight = getComputedStyle(el).height;
    el.style.height = '0px';
    el.offsetHeight; // force repaint
    el.style.height = endHeight;
  },
  afterEnter: function(el) {
    el.style.height = 'auto';
  },
  beforeLeave: function(el) {
    el.style.height = getComputedStyle(el).height;
    el.offsetHeight; // force repaint
    el.style.height = '0px';
  }
});
