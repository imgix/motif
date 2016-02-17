# Harmony

accompaniment
unison
tune
chord
composition
concert
chorus
motif
thesis
ditty


Create beautiful images to share your content, in just a few clicks.


## Temporary Scratch Paper

Still some encoding issues with text: http://www.theverge.com/2016/2/16/11018018/5d-data-storage-glass

Not properly grabbing stuff from the page sometimes. Probably related to why Kelly had that "safety timeout" in his implementation, but not totally sure what's going on with this. Example: https://www.kickstarter.com/projects/chronicleferguson/chronicle-ferguson-a-history-making-photo-book?ref=hero results in:

``` json
{ "id": 23, "url": "https://www.kickstarter.com/projects/chronicleferguson/chronicle-ferguson-a-history-making-photo-book?ref=hero", "title": null, "description": null, "accentColor": "000000", "fetchedAt": "2016-02-17T11:20:30.880Z", "ogImageURL": null }
```

### In URL

* `url` (used to "vary" and fetch title)
* `image_url` (old og:image)
* `color` (overlay color)

### Fetched

* `title`
* `description`?


## Running Locally

* `bin/rails db:setup`
* `bin/rake bower:install`
* `heroku local`
