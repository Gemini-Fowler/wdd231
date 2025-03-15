async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.querySelector("#directory");
    container.innerHTML = ""; 

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadMembers);

document.getElementById("gridView").addEventListener("click", () => {
    document.getElementById("directory").classList.add("grid-view");
    document.getElementById("directory").classList.remove("list-view");
});

document.getElementById("listView").addEventListener("click", () => {
    document.getElementById("directory").classList.add("list-view");
    document.getElementById("directory").classList.remove("grid-view");
});
