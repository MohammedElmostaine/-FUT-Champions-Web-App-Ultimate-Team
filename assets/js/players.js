
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
// Fetch players from localStorage and display them
let storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
if (storedPlayers.length > 0) {
    renderPlayer(storedPlayers); 
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

 