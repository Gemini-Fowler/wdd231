export function renderItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" onerror="this.src='images/fallback.png'; this.alt='Image not available'">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="view-details" data-id="${item.id}">View Details</button>
      `;
      container.appendChild(card);
    });
  }