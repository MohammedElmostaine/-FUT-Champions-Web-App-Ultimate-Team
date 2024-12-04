// Mobile Sidebar Menu Function
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

if (menuToggle && sidebar && closeSidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.add('hidden');
        }
    });
}


fetch('https://fut.codia-dev.com/data.json')
    .then((response) => response.json())
    .then((data) => {
        if (data.players) {
            
            localStorage.setItem('players', JSON.stringify(data.players));

            showPlayers(data.players); 
        } else {
            console.log('Players data is missing in the JSON response.');
        }
    })
    .catch((error) => console.log('Failed to fetch players:', error));


// Modal for adding a player to the bench
const closeModal = document.getElementById('close');
const openModalCards = document.querySelectorAll('.card');
const addPlayerModal = document.getElementById('addModal');
let cardId = null;

if (closeModal && addPlayerModal) {
    closeModal.addEventListener('click', () => {
        addPlayerModal.classList.add('hidden');
    });

    openModalCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            cardId = event.currentTarget.id; 
            console.log("Card ID:", cardId);
            addPlayerModal.classList.remove('hidden');
            showPlayers(storedPlayers); 
        });
    });
}

// Function to generate player HTML
function generatePlayerCard(player) {
    if (player.position === 'GK') {
        return `
        <div class="playerCard">
          <div class="rating">${player.rating}</div>
          <div class="position">${player.position}</div>
          <img class="photo" src="${player.photo}" alt="${player.name}">
          <h2 class="name">${player.name}</h2>
          <div class="stats">
            <span>DIV ${player.diving}</span>
            <span>HAN ${player.handling}</span>
            <span>KIK ${player.kicking}</span>
            <span>REF ${player.reflexes}</span>
            <span>PAC ${player.speed}</span>
            <span>PSN ${player.positioning}</span>
          </div>
          <img class="flag" src="${player.flag}" alt="${player.nationality}">
          <img class="logo" src="${player.logo}" alt="${player.club}">
          </div>
        `;
    } else {
        return`
        <div class="playerCard">
          <div class="rating">${player.rating}</div>
          <div class="position">${player.position}</div>
          <img class="photo" src="${player.photo}" alt="${player.name}">
          <h2 class="name">${player.name}</h2>
          <div class="stats">
            <span>PAC ${player.pace}</span>
            <span>SHO ${player.shooting}</span>
            <span>PAS ${player.passing}</span>
            <span>DRI ${player.dribbling}</span>
            <span>DEF ${player.defending}</span>
            <span>PHY ${player.physical}</span>
          </div>
          <img class="flag" src="${player.flag}" alt="${player.nationality}">
          <img class="logo" src="${player.logo}" alt="${player.club}">
                    </div>

        `;
    }

;
}

// Function to show players in the grid section
function showPlayers(players) {
    const playersContainer = document.getElementById('playerReserveGrid');
    playersContainer.innerHTML = '';  

    const filteredPlayers = cardId 
        ? players.filter(player => player.position === cardId) 
        : players;

    filteredPlayers.forEach((player) => {
        const playerCard = document.createElement('div');
        // playerCard.classList.add('cardPlayers2', 'p-2', 'text-white');
        playerCard.innerHTML = generatePlayerCard(player);
        playersContainer.appendChild(playerCard);

        playerCard.addEventListener('click', () => {
            const selectedPlayerName = player.name;
            console.log(selectedPlayerName);

            addPlayerModal.classList.add('hidden');
            const selectedCard = document.getElementById(cardId);
            
            if (selectedCard) {
                selectedCard.classList.remove('card');
                
    if (player.position === 'GK') {
       selectedCard.innerHTML = `
        <div class="playerCard">
          <div class="rating">${player.rating}</div>
          <div class="position">${player.position}</div>
          <img class="photo" src="${player.photo}" alt="${player.name}">
          <h2 class="name">${player.name}</h2>
          <div class="stats">
            <span>DIV ${player.diving}</span>
            <span>HAN ${player.handling}</span>
            <span>KIK ${player.kicking}</span>
            <span>REF ${player.reflexes}</span>
            <span>PAC ${player.speed}</span>
            <span>PSN ${player.positioning}</span>
          </div>
          <img class="flag" src="${player.flag}" alt="${player.nationality}">
          <img class="logo" src="${player.logo}" alt="${player.club}">
          </div>
        `;
    } else {
        selectedCard.innerHTML = `
        <div class="playerCard">
          <div class="rating">${player.rating}</div>
          <div class="position">${player.position}</div>
          <img class="photo" src="${player.photo}" alt="${player.name}">
          <h2 class="name">${player.name}</h2>
          <div class="stats">
            <span>PAC ${player.pace}</span>
            <span>SHO ${player.shooting}</span>
            <span>PAS ${player.passing}</span>
            <span>DRI ${player.dribbling}</span>
            <span>DEF ${player.defending}</span>
            <span>PHY ${player.physical}</span>
          </div>
          <img class="flag" src="${player.flag}" alt="${player.nationality}">
          <img class="logo" src="${player.logo}" alt="${player.club}">
                    </div>

        `;
                attachDeleteEvent(player.id, selectedCard);
            }
    }});
    });
}

// delete function
function attachDeleteEvent(playerId, cardElement) {
    const deleteBtn = cardElement.querySelector('#deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Deleting Player ID:", playerId);
            cardElement.innerHTML = ''; 
            cardElement.classList.add('card');
        });
    }
}

// Fetch players from localStorage and display them
const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
if (storedPlayers.length > 0) {
    showPlayers(storedPlayers); 
} else {
    console.log('No players found in localStorage.');
}