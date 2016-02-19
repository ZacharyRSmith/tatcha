var app;
$(function() {
  app = {
    root: 'http://jsonplaceholder.typicode.com',

    init: function() {
      app.stopSpinner();

      // Cache jQuery selectors
      app.$getPosts = $('#getPosts');

      // Add listeners
      app.$getPosts.on('click', app.getPosts);
    },
    getPosts: function () {
      app.startSpinner();

      $.ajax({
        url: app.root + '/posts',
        method: 'GET'
      }).then(function(data) {
        app.stopSpinner();

        console.log(data);
        return data;
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
