import { story, mediaQuery, renderMovies, renderWatchlist } from './util.js'
let movieArr = []
let watchlistStore = []
let watchlistLocalStore = JSON.parse(localStorage.getItem("watchlistStore"))


const main = document.getElementById('main')
const myForm = document.getElementById('myform')
const mySearch = document.getElementById('mySearch')
const wmain = document.getElementById('wmain')

//rendering Watchlist

if (watchlistLocalStore) {
        watchlistStore = watchlistLocalStore
        
    }

if (wmain) {
    if (watchlistLocalStore) {
        renderWatchlist(watchlistStore)
    }
    else {
        wmain.innerHTML = `
            <div class="empty">
                <div>
                    <h2>Your watchlist is looking pretty empty<h2>
                </div>
                <p class="addmovies">
                    <a href="./index.html">
                        <img src="./assets/watchlist.png" />  Let's add some movies
                    </a>
                </p>
            </div>`
    }
    const readMore = document.querySelectorAll('.readmore')
    const movies = document.querySelectorAll('.movie-container')


    for (let i = 0; i < readMore.length; i++) {
        readMore[i].addEventListener('click', () => {
            if (readMore[i].classList.contains('seeless')) {
                readMore[i].classList.remove('seeless')
                readMore[i].textContent = 'Read More'

            }
            else {
                readMore[i].classList.add('seeless')
                readMore[i].textContent = 'See Less'

            }
            movies[i].classList.toggle('active')
        })

    }


}

//Remove Button Error at this point
const remove = document.querySelectorAll('.remove')
for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', () => {
        // renderWatchlist(watchlistStore)
        console.log('remove clicked')
        const index = watchlistStore.length - 1
        if (index > -1) {
            watchlistStore.splice(index, 1)
        }

        localStorage.setItem('watchlistStore', JSON.stringify(watchlistStore))
        watchlistLocalStore = JSON.parse(localStorage.getItem('watchlistStore'))
        console.log(watchlistStore)
        renderWatchlist(watchlistStore)
    })
}




//for the searchbar
if (myForm) {
    myForm.addEventListener('submit', (e) => {
        document.getElementById('main').innerHTML = ''
        movieArr = []
        e.preventDefault();
        fetchData(mySearch.value)


    })
}

async function fetchData(value) {
    movieArr = []
    main.innerHTML = ''

    const res = await fetch(`http://www.omdbapi.com/?s=${value}&apikey=8e78e2ac`)
    const uData = await res.json()
    console.log(uData.Response)
    if (uData.Response === 'True') {
        for (let data of uData.Search) {
            // console.log(data)
            const res1 = await fetch(`http://www.omdbapi.com/?i=${data.imdbID}&apikey=8e78e2ac`)
            const finData = await res1.json()
            // console.log(finData)
            //if (fin)
            movieArr.push(finData)

        }
        renderMovies(movieArr)

        const readMore = document.querySelectorAll('.readmore')
        const movies = document.querySelectorAll('.movie-container')
        const watchlistBut = document.querySelectorAll('.watchlist')
        console.log(watchlistBut)
        console.log(movies)
        console.log(readMore)
        for (let i = 0; i < readMore.length; i++) {
            readMore[i].addEventListener('click', () => {
                if (readMore[i].classList.contains('seeless')) {
                    readMore[i].classList.remove('seeless')
                    readMore[i].textContent = '...Readmore'

                }
                else {
                    readMore[i].classList.add('seeless')
                    readMore[i].textContent = '...See Less'

                }
                movies[i].classList.toggle('active')
            })

        }
        for (let i = 0; i < watchlistBut.length; i++) {
            watchlistBut[i].addEventListener('click', () => {
                watchlistStore.unshift(movieArr[i]);
                localStorage.setItem('watchlistStore', JSON.stringify(watchlistStore))
                console.log(watchlistLocalStore)


            })
        }
    }
    else {
        main.innerHTML = `<div class="empty">
        <p class="error">Unable to find what you're looking for.</p>
        <p class="error">Please try another search</p>
        </div>`
    }
}



