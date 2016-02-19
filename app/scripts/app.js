var app;
$(function() {
  app = {
    root: 'http://jsonplaceholder.typicode.com',
    // albumsCache will have keys of userIds associated with values of
    // arrays of albums 
    albumsCache: { },

    init: function() {
      // Leave #stopSpinner in case of the removal of other methods called in
      // #init that invoke #stopSpinner
      app.stopSpinner();
      app.setAlbumsCache();

      // Cache jQuery selectors
      app.$getAlbumByUserId = $('#getAlbumByUserId');

      // Add listeners
      app.$getAlbumByUserId.on('click', app.getAlbumByUserId(1));
    },
    getAlbumByUserId: function (userId) {
      app.startSpinner();

      $.ajax({
        url: app.root + '/albums/' + userId,
        method: 'GET'
      }).done(function (data) {
        console.log(data);
        return data;
      }).fail(function (errMsg, errObj) {
        errMsg = errMsg || "None given.";
        errObj = errObj || "None given.";
        console.error("Error message: ", errMsg);
        console.error("Error object: ", errObj);
      }).always(function () {
        app.stopSpinner();
      });
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
    startSpinner: function(){
      $('.spinner img').show();
    },
    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
    }
  };
}());
