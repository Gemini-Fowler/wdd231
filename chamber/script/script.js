document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("directory");
    const weatherSection = document.querySelector(".weather");
    const spotlightsSection = document.querySelector(".spotlight-container");
    const API_KEY = "add698cf907a2f2be2d41cc50acd670d";
    const LAT = "16.7666";
    const LON = "-3.0026";

    function getWeather() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.list || data.list.length === 0) {
                    weatherSection.innerHTML = `<h3>Weather Data Unavailable</h3>`;
                    return;
                }

                const currentTemp = Math.round(data.list[0].main.temp);
                const currentDescription = data.list[0].weather[0].description;

                let forecastHtml = `<h3>Weather</h3>
                    <p>Current: ${currentTemp}°F - ${currentDescription}</p>
                    <h4>3-Day Forecast:</h4>`;

                const forecastDays = {};
                data.list.forEach(entry => {
                    const date = new Date(entry.dt_txt).toDateString();
                    if (!forecastDays[date] && entry.dt_txt.includes("12:00:00")) {
                        forecastDays[date] = entry;
                    }
                });

                Object.values(forecastDays).slice(0, 3).forEach((dayData, index) => {
                    let temp = Math.round(dayData.main.temp);
                    let desc = dayData.weather[0].description;
                    forecastHtml += `<p>Day ${index + 1}: ${temp}°F - ${desc}</p>`;
                });

                weatherSection.innerHTML = forecastHtml;
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const memberElement = document.createElement("div");
            memberElement.classList.add("member");
            memberElement.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(memberElement);
        });
    }
    
    function displaySpotlights(members) {
        const eligibleMembers = members.filter(m => m.membership >= 2);
        const selected = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        spotlightsSection.innerHTML = "";
        selected.forEach(member => {
            spotlightsSection.innerHTML += `
                <div class="spotlight">
                    <img src="images/${member.image}" alt="${member.name}">
                    <h4>${member.name}</h4>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit</a>
                </div>`;
        });
    }

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            displayMembers(data);
            displaySpotlights(data);
        })
        .catch(error => console.error("Error loading members:", error));

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    getWeather();
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("timestamp").value = new Date().toISOString();

const memberships = [
    { id: 'np', title: 'NP Membership', description: 'Non-profit organizations can join for free and access networking opportunities.' },
    { id: 'bronze', title: 'Bronze Membership', description: 'Includes event discounts and basic promotional features.' },
    { id: 'silver', title: 'Silver Membership', description: 'Includes training sessions, enhanced promotion, and VIP networking events.' },
    { id: 'gold', title: 'Gold Membership', description: 'All benefits included, with premium advertising and exclusive invitations.' }
];

const cardContainer = document.querySelector('.membership-cards');
cardContainer.innerHTML = memberships.map(m => `
    <div class="card">
        <h3>${m.title}</h3>
        <a href="#" onclick="openModal('${m.id}-modal')">Learn More</a>
    </div>
`).join('');

const modalContainer = document.createElement('div');
modalContainer.innerHTML = memberships.map(m => `
    <div id="${m.id}-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${m.title}</h2>
            <p>${m.description}</p>
        </div>
    </div>
`).join('');
document.body.appendChild(modalContainer);

document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.style.display = "none";
    });
});

function openModal(id) {
    document.getElementById(id).style.display = "block";
}
