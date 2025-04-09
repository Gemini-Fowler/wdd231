document.addEventListener("DOMContentLoaded", () => {
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => displayCards(data))
        .catch(error => console.error("Error loading JSON:", error));

    function displayCards(locations) {
        const container = document.getElementById("discover-cards");
        container.innerHTML = "";

        locations.forEach(location => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${location.name}</h2>
                <figure>
                    <img src="${location.image}" alt="${location.name}">
                </figure>
                <address>${location.address}</address>
                <p>${location.description}</p>
                <button onclick="window.location.href='${location.link}'">Learn More</button>
            `;

            container.appendChild(card);
        });
    }

    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? "s" : ""} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
});
