import Movie from './movie.js';

async function fetchMovies() {
    const response = await fetch('http://localhost:3000/movies');
    const moviesData = await response.json();
    return moviesData.map(movie => new Movie(movie.id, movie.Title, movie.Price));
}

async function populateMovies() {
    const movies = await fetchMovies();
    const movieSelect = document.getElementById('movie');
    movieSelect.innerHTML = movies.map(movie =>
        `<option value="${movie.price}">${movie.title} (${movie.price} SEK)</option>`
    ).join('');
}

populateMovies();
