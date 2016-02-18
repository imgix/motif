var page = require('webpage').create();
var system = require('system');
var args = system.args;

var url = args[1];
var viewportWidth = 1200;

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

function getPageTitle() {
  var title = page.evaluate(function() {
    var ogTitleTag = document.querySelector('meta[property="og:title"]');
    var titleTag = document.querySelector('title');
    var titleText = false;

    if (ogTitleTag) {
      titleText = ogTitleTag.getAttribute('content');
    } else if (titleTag) {
      titleText = titleTag.textContent;
    }

    return titleText;
  });

  return title || null;
}

function getPageDescription() {
  var description = page.evaluate(function() {
    var descriptionTag = document.querySelector('meta[property="og:description"]');

    if (!descriptionTag) {
      descriptionTag = document.querySelector('meta[name="description"]');
    }

    return descriptionTag ?
      descriptionTag.getAttribute('content') :
      false;
  });

  return description || null;
}

function getOgImageURL() {
  var ogImageURL = page.evaluate(function() {
    var ogImageTag = document.querySelector('meta[property="og:image"]');

    return ogImageTag ?
      ogImageTag.getAttribute('content') :
      false;
  });

  return ogImageURL || null;
}

function getAccentColor() {
  var linkColorString = page.evaluate(function() {
    var colorSamplerLink = document.createElement('a');
    colorSamplerLink.textContent = '<3 imgix';
    document.body.appendChild(colorSamplerLink);

    return window.getComputedStyle(colorSamplerLink).color;
  });

  var accentColor = linkColorString.match(/(\d+)/g).map(function(val, i) {
    if (i > 2) {
      return null;
    }

    var hexVal = parseInt(val, 10).toString(16);
    return hexVal.length == 1 ?
      '0' + hexVal :
      hexVal;
  }).filter(function(num) {
    return num != null;
  }).join('');

  return accentColor || null;
}

page.open(url, function() {
  var pageTitle = getPageTitle();
  var pageDescription = getPageDescription();
  var ogImageURL = getOgImageURL();
  var accentColor = getAccentColor();

  system.stdout.write(JSON.stringify({
    title: pageTitle,
    description: pageDescription,
    ogImageURL: ogImageURL,
    accentColor: accentColor
  }));

  phantom.exit();
});
