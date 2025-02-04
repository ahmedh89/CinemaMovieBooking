import './app.js'; // Importerar filmerna från API

const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Hämta filmer från API och fyll i <select>
async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:3000/movies');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        console.log("Filmer hämtade från API:", movies); // ✅ Debugging

        // Lägg in filmer i <select> och sätt rätt value-attribut
        movieSelect.innerHTML = movies.map(movie =>
            `<option value="${movie.price}" data-price="${movie.price}">${movie.Title} (${movie.price} SEK)</option>`
        ).join('');

        // Uppdatera pris och antal när filmerna laddas
        updateSelectedCount();
    } catch (error) {
        console.error("Fel vid hämtning av filmer:", error);
    }
}

// Uppdatera antalet valda platser och totala kostnaden
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    // ✅ Hämta priset från det valda alternativet
    const selectedMovie = movieSelect.options[movieSelect.selectedIndex];
    const ticketPrice = selectedMovie ? Number(selectedMovie.dataset.price) : 0;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    console.log(`Antal valda: ${selectedSeatsCount}, Biljettpris: ${ticketPrice}, Totalt: ${total.innerText} SEK`);
}

// Hantera klick på stolar (växla mellan vald och ledig)
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Uppdatera vid byte av film
movieSelect.addEventListener('change', updateSelectedCount);

// Ladda filmer när sidan öppnas
fetchMovies();
