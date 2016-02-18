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


http://www.theverge.com/2016/2/17/11030406/neverware-google-chromebook-chromium-os-education-microsoft

http://www.theverge.com/2016/2/17/11036306/apple-fbi-iphone-encryption-backdoor-tim-cook

http://www-scf.usc.edu/~eswatkin/itp104/classpage.html/logo.png


txtfont=Avenir%20Next%20Demi%2CBold


http://localhost:5000/i?url=http%3A%2F%2Fwww.theverge.com%2F2016%2F2%2F17%2F11030406%2Fneverware-google-chromebook-chromium-os-education-microsoft&image_url=https%3A%2F%2Fcdn3.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F6058369%2Fakrales_160211_0932_0010_fin.0.jpg&color=444444&logo_url=http%3A%2F%2Fwww-scf.usc.edu%2F~eswatkin%2Fitp104%2Fclasspage.html%2Flogo.png


https://harmony-development.imgix.net/https%3A%2F%2Fcdn3.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F6058369%2Fakrales_160211_0932_0010_fin.0.jpg?ixlib=rb-1.0.0&w=1200&h=1200&fit=crop&crop=faces%2Centropy&blend=https%3A%2F%2Fassets.imgix.net%2F~text%3Fw%3D1200%26h%3D1200%26bg%3DCC444444%26mark%3Dhttps%3A%2F%2Fs3.amazonaws.com%2Ff.cl.ly%2Fitems%2F0w3G08271N142E1B1d17%2FImage%25202016-02-17%2520at%25206.58.04%2520PM.png%3Fv%3D8bc8c372%26markalign%3Dtop%2Cleft%26markfit%3Dmax%26markh%3D200%26markpad%3D50&bm=normal&markalign=center%2Cmiddle&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtfont%3DAvenir+Next+Demi%2CBold%26w%3D1000%26txtclr%3Dfff%26txtsize%3D66%26txtalign%3Dleft%26txt%3DHow+schools+around+the+country+are+turning+dead+Microsoft+PCs+into+speedy+Chromebooks&s=93e2106dc45a9134f2060cbf66adb18e

https://media.npr.org/chrome/news/npr-home.png


https://harmony-development.imgix.net/https%3A%2F%2Fqzprod.files.wordpress.com%2F2016%2F02%2Frtx1ufx3-e1455664443666.jpg%3Fquality%3D80%26strip%3Dall%26w%3D1600?ixlib=rb-1.0.0&w=1200&h=1200&fit=crop&crop=faces%2Centropy&blend=https%3A%2F%2Fharmony-development-text.imgix.net%2F%7Etext%3Ftxtalign%3Dleft%2Cmiddle%26txtclr%3Dfff%26txtsize%3D66%26txtpad%3D80%26txt%3DEven+US+Republicans+agree+with+Obama+on+this%3A+Africa+needs+electricity%26bg%3DCC168dd9%26w%3D1200%26h%3D1200&markalign=top%2Ccenter&markfit=max&markh=200&markpad=80&bm=normal&mark=https%3A%2F%2Fmedia.npr.org%2Fchrome%2Fnews%2Fnpr-home.png&s=80d088ead40bd8b8f1c40f311ab78ae3


https://harmony-development.imgix.net/https%3A%2F%2Fqzprod.files.wordpress.com%2F2016%2F02%2Frtx1ufx3-e1455664443666.jpg%3Fquality%3D80%26strip%3Dall%26w%3D1600?ixlib=rb-1.0.0&w=1200&h=1200&fit=crop&crop=faces%2Centropy&blend=https%3A%2F%2Fharmony-development-text.imgix.net%2F%7Etext%3Ftxtalign%3Dleft%2Cmiddle%26txtclr%3Dfff%26txtsize%3D66%26txtpad%3D80%26txt%3DEven+US+Republicans+agree+with+Obama+on+this%3A+Africa+needs+electricity%26bg%3DCC168dd9%26w%3D1200%26h%3D1200&markalign=top%2Ccenter&markfit=max&markh=200&markpad=80&bm=normal&mark=http%3A%2F%2Fmedia.npr.org%2Fchrome%2Fnews%2Fnpr-home.png&s=e69b5d2250ea8022b994d5eff3285039
