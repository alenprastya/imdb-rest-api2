function searchmovie() {
    $('#movie-list').html('');


    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4df3d4f6',
            's': $('#search-input').val()
        },
        success: function(hasil) {
            if (hasil.Response == "True") {
                let movies = hasil.Search;
                console.log(movies)

                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                        <div class="card mb-3" style="width: 18rem;">
                            <img src="` + data.Poster + `" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Type + `</h6>
                                <a href="#" class="card-link see-detail "data-bs-toggle="modal" data-bs-target="#exampleModal" data-id = "` + data.imdbID + `">See Detail</a>
                            </div>
                        </div>
                    `)
                })
                $('#search-input').val('')

            } else {
                $('#movie-list').html(`<h1 class = "text-center">` + hasil.Error + `</h1>`)
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchmovie();
})

$('#search-input').on('keyup', function(e) {
    if (e.which == 13) {
        searchmovie();
    }
});

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4df3d4f6',
            'i': $(this).data('id')
        },
        success: function(movie) {
            if (movie.Response == 'True') {
                $('.modal-body').html(`
                <div class = "container-fluid">
                <div class = "row">
                <div class = "col-md-4">
                <img src = "` + movie.Poster + `" class = "img-fluid">
                
                </div>
                <div class = "col-md-8">
                <ul class="list-group">
                <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                <li class="list-group-item">Releases : ` + movie.Released + `</li>
                <li class="list-group-item">genre : ` + movie.Genre + `</li>
                <li class="list-group-item">Actors : ` + movie.Actors + `</li>
                </ul>
                </div>
                </div>
                </div>`)
            }
        }
    })

})