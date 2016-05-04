$(document).ready(function(){
  var page = 0;
  var loadDataToDisplay = function(response) {
    if (response.Error) {
      console.log(response.Error);
      var $msg = $('<div>').text(response.Error);
      $('.movie_list').append($msg);
    } else {
      var movies = response.Search;
      movies.forEach(function(movie){
        // handlebars template
        var templateString = $("#item-template").html();
        var templateFunction = Handlebars.compile(templateString);
        var image = movie.Poster;
        if (movie.Poster === 'N/A') {
          image = "http://mteliza.vic.cricket.com.au/files/819/images/imageNotAvailable.jpg";
        }
        var html = templateFunction({title: movie.Title,image_url: image});
        var $newElem = $('<div>').addClass('movie-card').html(html);
        $('.movie_list').append($newElem);
      });
    }
  }

  $('#search-form').on('submit',function(event){
    event.preventDefault();
    var keyword = $('input').val();
    console.log("keyword:"+keyword);
    $.ajax({
      url: 'http://www.omdbapi.com/',
      data: {s: keyword},
      dataType: 'json'
    }).done(function(response){
        $('.movie_list').empty();
        loadDataToDisplay(response);
        page = 1;
    });
  });

  $('.movie_list').on('click','p',function(event) {
    var title = $(event.target).text();
    console.log(title);
    $.ajax({
      url: "http://www.omdbapi.com/",
      data: {t: title},
      method: 'get'
    }).done(function(response) {

      var movie = response;
      $('.movie_list').empty();
      $h3 = $('<h3>').text(movie.Title);
      var image_url = movie.Poster;
      if (movie.Poster === 'N/A') {
        image_url = "http://mteliza.vic.cricket.com.au/files/819/images/imageNotAvailable.jpg";
      }
      $img = $('<img>').addClass("poster").attr('src',image_url);
      $imageDiv = $('<div>').addClass('poster-image');
      $imageDiv.append($img);
      $plot = $('<div>').addClass('movie-plot').text(movie.Plot);
      $movie_detail = $('<div>').addClass("movie-detail");
      $movie_detail.append($h3,$plot,$imageDiv);
      $('.movie_list').append($movie_detail);
    });
  });


  //load more button event
  $('#load-more-btn').on('click',function(event){
    // console.log(this);
    // console.log(event.target);
    // console.log("load more...");
    page ++;
    $.ajax({
      url: 'http://www.omdbapi.com/',
      data: {s: $('input').val(), page: page}
    }).done(function(response){
      console.log(response);
      loadDataToDisplay(response);
    });

  });










});

