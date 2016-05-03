$(document).ready(function(){

  $('#searchBtn').on('click',function(){
    var keyword = $('input').val();
    $.ajax({
      url: "http://www.omdbapi.com/?s="+keyword,
      method: 'get'
    }).done(function(response){
        $('.movie_list').empty();
        if (response.Error) {
          console.log(response.Error);
          $msg = $('<div>').text(response.Error);
          $('.movie_list').append($msg);
        } else {
          var movies = response.Search;
          movies.forEach(function(movie){
            var $title = $('<p>').text(movie.Title);
            var $img = $('<img>').addClass('tiny-img').attr('src',movie.Poster);
            var $movie_card = $('<div>').addClass('movie-card');
            $movie_card.append($img,$title);
            $('.movie_list').append($movie_card);
          });
        }
    });
  });

  $('.movie_list').on('click','p',function(event) {
    debugger
    var title = $(event.target).text();
    console.log(title);
    $.ajax({
      url: "http://www.omdbapi.com/?t="+title,
      method: 'get'
    }).done(function(response) {

      var movie = response;
      $('.movie_list').empty();
      $h3 = $('<h3>').text(movie.Title);
      $img = $('<img>').addClass("poster").attr('src',movie.Poster);
      $imageDiv = $('<div>').addClass('poster-image');
      $imageDiv.append($img);
      $plot = $('<div>').addClass('movie-plot').text(movie.Plot);
      $movie_detail = $('<div>').addClass("movie-detail");
      $movie_detail.append($h3,$plot,$imageDiv);
      $('.movie_list').append($movie_detail);
    });
  });


});

