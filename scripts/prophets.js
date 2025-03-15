document.addEventListener("DOMContentLoaded", () => {
    const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
    const container = document.getElementById("prophets-container");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prophets = data.prophets;
            prophets.forEach(prophet => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h2>${prophet.name} ${prophet.lastname}</h2>
                    <p>Birth Date: ${prophet.birthdate}</p>
                    <p>Birthplace: ${prophet.birthplace}</p>
                    <img src="${prophet.imageurl}" alt="Portrait of ${prophet.name} ${prophet.lastname}">
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
