//Display readmore and showless on smallscreen
const mediaQuery = window.matchMedia("(max-width: 700px)")
function story(size, story) {
    if (size.matches) {
        if (story.length > 30) {

            return `<div class="story">
            ${story.slice(0, 30)}<button class='readmore'>...Readmore</button>
            <div class="hidden">
            ${story.slice(30,)}
            </div>
        </div>`
        }
        else {
            return `<div class="story">
            ${story}
        </div>`

        }
    }
    else {
        return `<div class="story">
        ${story}
    </div>`

    }

}
//function to render movies
function renderMovies(data) {
    for (let i = 0; i < data.length; i++) {
        main.innerHTML += `<div class="movie-container">
        <div class="movie-image">
             <img src="${data[i].Poster}" alt="">
         </div>
         <div class="movie-description">
             <div class="movie_tit_rat">
             <h2 class="title">${data[i].Title}</h2>
                 <p><img src="./assets/star.png"/>  ${data[i].imdbRating}</p>
             </div>
             <div class="movie-style">
                 <div class="time">${data[i].Runtime}</div>
                 <div class="genre">${data[i].Genre}</div>
                 <button class="watchlist"><img src="./assets/watchlist.png">  Watchlist</button>
             </div>
               ${story(mediaQuery, data[i].Plot)}
             </div>
                 </div>`
    }

}
//function to display watchlist
function renderWatchlist(watchlistStore) {
    wmain.innerHTML = ''
    for (let i = 0; i < watchlistStore.length; i++) {
        wmain.innerHTML += `<div class="movie-container">
        <div class="movie-image">
             <img src="${watchlistStore[i].Poster}" alt="">
         </div>
         <div class="movie-description">
             <div class="movie_tit_rat">
             <h2 class="title">${watchlistStore[i].Title}</h2>
                 <p><img src="./assets/star.png"/>  ${watchlistStore[i].imdbRating}</p>
             </div>
             <div class="movie-style">
                 <div class="time">${watchlistStore[i].Runtime}</div>
                 <div class="genre">${watchlistStore[i].Genre}</div>
                 <button class="remove"><img src="./assets/remove.png">  Remove</button>
             </div>
             ${story(mediaQuery, watchlistStore[i].Plot)}
             </div>
                 </div>`
    }

}
export {story, renderMovies, renderWatchlist, mediaQuery}