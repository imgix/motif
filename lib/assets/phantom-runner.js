var page = require('webpage').create();
var system = require('system');
var args = system.args;

var url = args[1];
var viewportWidth = 1200;
var results = [];
var loadStart = Date.now();
var SAFETY_TIMEOUT = 10 * 1000; // Time to wait before measuring the page.

// We don't want to spill useless data into stdout, which will cause us to spit out incorrect JSON
page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      var tFunction = t.function;
      msgStack.push(' -> ' + t.file + ': ' + t.line + (tFunction ? ' (in function "' + tFunction + '")' : ''));
    });
  }
  // uncomment to log into the console
  // console.error(msgStack.join('\n'));
};

page.viewportSize = {
  width: viewportWidth,
  height: Math.floor(viewportWidth * (0.66))
};

page.onResourceReceived = function(response) {
  if (response.bodySize <= 0) {
    return;
  }

  if (/data:/.exec(response.url)) {
    return;
  }

  results.push(response);
};

page.open(url, function() {
  var pageTitle = page.evaluate(function() {
    var ogTitleTag = document.querySelector('meta[property="og:title"]');
    var titleTag = document.querySelector('title');
    var titleText = false;

    if (ogTitleTag) {
      titleText = ogTitleTag.getAttribute('content');
    } else if (titleTag) {
      titleText = titleTag.textContent;
    }

    return titleText;
  }) || null;

  var pageDescription = page.evaluate(function() {
    var descriptionTag = document.querySelector('meta[property="og:description"]');

    if (!descriptionTag) {
      descriptionTag = document.querySelector('meta[name="description"]');
    }

    return descriptionTag ?
      descriptionTag.getAttribute('content') :
      false;
  }) || null;

  var ogImageURL = page.evaluate(function() {
    var ogImageTag = document.querySelector('meta[property="og:image"]');

    return ogImageTag ?
      ogImageTag.getAttribute('content') :
      false;
  }) || null;

  var linkColorString = page.evaluate(function() {
    var colorSamplerLink = document.createElement('a');
    document.body.appendChild(colorSamplerLink);

    return window.getComputedStyle(colorSamplerLink).color;
  });

  var linkRGBColor = linkColorString.match(/(\d+)/g).map(function(val) {
    return parseInt(val, 10);
  });

  var hexAccentColor = linkRGBColor.map(function(val, i) {
    if (i > 2) {
      return null;
    }

    return ('0' + val).toString(16).slice(-2)
  }).filter(Number).join('') || null;

  system.stdout.write(JSON.stringify({
    title: pageTitle,
    description: pageDescription,
    ogImageURL: ogImageURL,
    accentColor: hexAccentColor
  }));

  phantom.exit();
});
