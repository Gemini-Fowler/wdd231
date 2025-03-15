document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

async function fetchBusinessData() {
    try {
        const response = await fetch('data/members.json');
        const businesses = await response.json();
        displayBusinesses(businesses);
    } catch (error) {
        console.error("Error fetching business data:", error);
    }
}

function displayBusinesses(businesses) {
    const directory = document.getElementById("directory");
    directory.innerHTML = ""; 

    businesses.forEach(business => {
        const card = document.createElement("div");
        card.classList.add("business-card");

        card.innerHTML = `
            <img src="images/${business.image}" alt="${business.name}">
            <h3>${business.name}</h3>
            <p><strong>Address:</strong> ${business.address}</p>
            <p><strong>Phone:</strong> ${business.phone}</p>
            <a href="${business.website}" target="_blank">Visit Website</a>
        `;

        directory.appendChild(card);
    });
}

document.getElementById("grid-view").addEventListener("click", () => {
    document.getElementById("directory").classList.remove("list-view");
    document.getElementById("directory").classList.add("grid-view");
});

document.getElementById("list-view").addEventListener("click", () => {
    document.getElementById("directory").classList.remove("grid-view");
    document.getElementById("directory").classList.add("list-view");
});

fetchBusinessData();
