/* <div class="bg-contain bg-center bg-no-repeat w-[100%] h-[100%] sm:h-auto md:h-auto lg:h-auto"
                        style="background-image: url(assets/img/badge\ \(40\ x\ 60\ px\).svg)">
                        <div class="flex mt-2 sm:mt-3 md:mt-4 lg:mt-5">
                            <!-- Player Stats -->
                            <div
                                class="flex flex-col items-start items-center font-bold pt-[8px] pl-[3px] sm:pt-[10px] sm:pl-[5px] md:pt-[12px] md:pl-[7px] lg:pt-[15px] lg:pl-[20px]">
                                <span
                                    class="text-black text-[0.4rem] sm:text-[0.6rem] md:text-[0.8rem] lg:text-[1rem]">91</span>
                                <span class="text-[0.3rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.9rem]">ST</span>
                            </div>
                            <!-- Player Photo -->
                            <div class="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%]">
                                <img class="w-[100%] mt-[8px] mr-[5px] justify-self-center sm:mt-[10px] md:mt-[12px] lg:mt-[25px] lg:mr-[15px]"
                                    src="https://cdn.sofifa.net/players/239/085/25_120.png" alt="Haaland">
                            </div>
                        </div>
                        <!-- Player Name -->
                        <div class="text-[0.3rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.9rem] font-bold">Haaland
                        </div>
                        <!-- Stats Section -->
                        <div class="flex flex-col items-start items-center">
                            <div
                                class="flex justify-center font-bold gap-[1px] sm:gap-[2px] md:gap-[3px] lg:gap-[5px] w-80%">
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">PAC</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">89</span>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">SHO</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">94</span>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">PAS</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">65</span>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">DRI</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">80</span>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">DEF</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">45</span>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">PHY</span>
                                    <span
                                        class="text-[0.2rem] sm:text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]">88</span>
                                </div>
                            </div>
                            <!-- Nationality and Club -->
                            <div
                                class="flex justify-center items-center mb-1 mt-[2px] sm:mt-[3px] md:mt-[4px] lg:mb-[7px] ">
                                <img class="w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px] mr-1"
                                    src="https://cdn.sofifa.net/flags/no.png" alt="Norway Flag">
                                <img class="w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px]"
                                    src="https://cdn.sofifa.net/meta/team/476/120.png" alt="Team Logo">
                            </div>
                        </div>
                    </div> */



const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
let storedPlayers = [];
const playerGrid = document.getElementById('playerReserveGrid');




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


// fetch('http://fut.codia-dev.com/data.json')
//     .then((response) => response.json())
//     .then((data) => {
//         localStorage.setItem('players', JSON.stringify(data.players));

//          storedPlayers = JSON.parse(localStorage.getItem('players')) || [];

//         console.log(storedPlayers);
//     })
//     .catch((error) => console.error('Error fetching player data:', error));


const fetchPlayerData = async () => {
    try {
        const url = 'http://fut.codia-dev.com/data.json';
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.players);

        // Store player data in localStorage
        localStorage.setItem('players', JSON.stringify(data.players));
        storedPlayers = data.players; // Set storedPlayers to the fetched player data
    } catch (error) {
        console.log(error.message);
    }
};
fetchPlayerData();

function showPlayers() {
    if (localStorage.length === 0) {
        console.log('No players found in localStorage.');
        return; // Exit if no players in localStorage
    }

    storedPlayers = JSON.parse(localStorage.getItem('players')) || []; // Fetch players from localStorage


    storedPlayers.forEach(player => {
          // Create the player card
          const playerCard = document.createElement("div");
          playerCard.className = "player-card";

          if (player.position === "GK") {
            playerCard.innerHTML = `
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
            `;
          } else {
            playerCard.innerHTML = `
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
             `;
          };

        playerGrid.appendChild(playerCard);
    }
    )
};

showPlayers(storedPlayers);



