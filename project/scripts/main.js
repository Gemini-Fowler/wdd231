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

  if (!container || !modal || !modalContent || !closeBtn) {
    console.error('Required DOM elements are missing');
    return;
  }

  function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  container.addEventListener('click', e => {
    const button = e.target.closest('.view-details');
    if (button) {
      const id = Number(button.dataset.id);
      const item = items.find(i => i.id === id);
      if (!item) return;

      modalContent.innerHTML = `
        <h2 id="modalTitle">${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">
        <p>${item.description}</p>
        <p>${item.details}</p>
        <a href="${item.link}" target="_blank">Learn more</a>
      `;
      modal.showModal();
      trapFocus(modal);

      if (!viewed.includes(id)) {
        viewed.push(id);
        if (viewed.length > 100) viewed.shift(); // Limit to 100 items
        localStorage.setItem('viewedItems', JSON.stringify(viewed));
      }
    }
  });

  closeBtn.addEventListener('click', () => modal.close());
}

init();