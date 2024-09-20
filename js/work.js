
// Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to fetch data from JSON and conditionally display cards
fetch('../Json/work-data.json')
    .then(response => response.json())
    .then(data => {
        // Shuffle the data array to randomize card order
        shuffleArray(data);

        // Check if the page is index.html
        const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

        // If it's index.html, limit to 3 cards, else show all cards
        const cardsToDisplay = isIndexPage ? data.slice(0, 3) : data;

        const cardContainer = document.getElementById('card-container');
        cardsToDisplay.forEach(cardData => {
            // Create card element
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'text-center');

            // Add content to the card
            card.innerHTML = `
                    <a href="${cardData.link}" class="work" style="background-image: url(${cardData.image}); background-size: contain;">
                        <div class="desc">
                            <h3>${cardData.title}</h3>
                            <span>${cardData.description}</span>
                        </div>
                    </a>
                `;

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
