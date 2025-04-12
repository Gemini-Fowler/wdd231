import { fetchItems } from './dataService.js';
import { renderItems } from './ui.js';

async function init() {
  const items = await fetchItems();
  renderItems(items);

  const viewed = JSON.parse(localStorage.getItem('viewedItems') || '[]');
  
  const container = document.getElementById('itemsContainer');
  const modal = document.getElementById('itemModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('closeModal');

  container.addEventListener('click', e => {
    if (e.target.matches('.view-details')) {
      const id = Number(e.target.dataset.id);
      const item = items.find(i => i.id === id);
      if (!item) return;

      modalContent.innerHTML = `
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">
        <p>${item.description}</p>
        <p>${item.details}</p>
        <a href="${item.link}" target="_blank">Learn more</a>
      `;
      modal.showModal();

      if (!viewed.includes(id)) {
        viewed.push(id);
        localStorage.setItem('viewedItems', JSON.stringify(viewed));
      }
    }
  });

  closeBtn.addEventListener('click', () => modal.close());
}

init();
