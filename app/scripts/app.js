var app;
$(function() {
  app = {
    root: 'http://jsonplaceholder.typicode.com',
    // albumsCache will have keys of userIds associated with values of
    // arrays of albums 
    albumsCache: { },
    // photosCache will have keys of albumIds associated with values of
    // arrays of photos
    photosCache: { },

    init: function() {
      // Leave #stopSpinner in case of the removal of other methods called in
      // #init that invoke #stopSpinner
      app.startSpinner();
      app.setAlbumsCache();
      // FIXME #setAlbumsCache will stopSpinner() after
      // #setPhotosCache has invoked #startSpinner, but before it has
      // invoked #stopSpinner.  So, the spinner stops prematurely.
      app.setPhotosCache();

      // Cache jQuery selectors
      app.$currentAlbum = $('#currentAlbum');
      app.$currentAlbums = $('#currentAlbums');
      app.$getAlbumByUserId = $('#getAlbumByUserId');

      // Add listeners
      app.$currentAlbums.on('click', 'li', function () {
        var albumId = $(this).attr('id').match(/[0-9]+/);
        app.setCurrentAlbum(albumId);
      });
      app.$getAlbumByUserId.on('click', function () {
        app.getAlbumByUserId(1);
      });
    },
    getAlbumByUserId: function (userId) {
      if (!app.albumsCache[userId]) return;
      var newCrntAlbums = app.albumsCache[userId].reduce(function (newCrntAlbums, album) {
        var album = '<li id="album' + album.id + '">' + album.title + '</li>';
        return newCrntAlbums + album;
      }, '');

      app.$currentAlbums.html(newCrntAlbums);
    },
    setAlbumsCache: function () {
      app.startSpinner();

      $.ajax({
        url: app.root + '/albums',
        method: 'GET'
      }).done(function (albums) {
        albums.forEach(function (album) {
          app.albumsCache[album.userId] = app.albumsCache[album.userId] || [];
          app.albumsCache[album.userId].push(album);
        });
      }).fail(function (errMsg, errObj) {
        errMsg = errMsg || "None given.";
        errObj = errObj || "None given.";
        console.error("Error message: ", errMsg);
        console.error("Error object: ", errObj);
      }).always(function () {
        app.stopSpinner();
      });
    },
    setCurrentAlbum: function (albumId) {
      if (!app.photosCache[albumId]) return;
      var newCrntAlbum = app.photosCache[albumId].reduce(function (newCrntAlbum, photo) {
        var photo = '<li id="photo' + photo.id + '">' +
                      '<h5>' + photo.title + '</h5>' +
                      '<img alt="' + photo.title + '"' +
                           'src="' + photo.thumbnailUrl + '" />' +
                    '</li>';
        return newCrntAlbum + photo;
      }, '');

      app.$currentAlbum.html(newCrntAlbum);
    },
    setPhotosCache: function () {
      app.startSpinner();

      $.ajax({
        url: app.root + '/photos',
        method: 'GET'
      }).done(function (photos) {
        photos.forEach(function (photo) {
          app.photosCache[photo.albumId] = app.photosCache[photo.albumId] || [];
          app.photosCache[photo.albumId].push(photo);
        });
      }).fail(function (errMsg, errObj) {
        errMsg = errMsg || "None given.";
        errObj = errObj || "None given.";
        console.error("Error message: ", errMsg);
        console.error("Error object: ", errObj);
      }).always(function () {
        app.stopSpinner();
      });
    },
    startSpinner: function(){
      $('.spinner img').show();
    },
    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
    }
  };
}());
