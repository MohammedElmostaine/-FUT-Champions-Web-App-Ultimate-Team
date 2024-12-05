
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

async function fetchPlayers() {
    let localData = localStorage.getItem('players');
    if (localData) {
        storedPlayers = JSON.parse(localData);
        showPlayers(storedPlayers);
        renderPlayer(storedPlayers);
    } else {
        try {
            const response = await fetch('https://fut.codia-dev.com/data.json');
        const data = await response.json();

            if (data.players) {
                storedPlayers = data;
                localStorage.setItem("players", JSON.stringify(data.players));
                showPlayers(data.players);
                renderPlayer(storedPlayers);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            
        }
    }
}


fetchPlayers();


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

    const filteredPlayers = players.filter(player => 
        cardId ? player.position.includes(cardId.slice(0, 2)) : true
      );

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
          <div>
                        <i class="absolute ri-delete-bin-6-line text-white text-sm bottom-2 left-0 cursor-pointer" data-id="${player.id}" id="deleteBtn"></i>
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
                    <div>
                        <i class="absolute ri-delete-bin-6-line text-white text-sm bottom-2 left-1 cursor-pointer" data-id="${player.id}" id="deleteBtn"></i>
                    </div>

        `;}
        deleteEvent(player.id, selectedCard);
    }});
    });
}

// delete function
function deleteEvent(playerId, cardElement) {
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
let storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
if (storedPlayers.length > 0) {
    showPlayers(storedPlayers); 
} else {
    console.log('No players found in localStorage.');
}






function renderPlayer(data){
    const container = document.getElementById("playersPgGrid");
    console.log(data);
       container.innerHTML = '';
    data.forEach((player) => {
        

       const playerpgCard = document.createElement('div');
       console.log(player);
        
       playerpgCard.innerHTML = generatePlayerCard(player);
        container.appendChild(playerpgCard);
        
        
          })
}
renderPlayer(storedPlayers)
 