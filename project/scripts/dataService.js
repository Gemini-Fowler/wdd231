export async function fetchItems() {
    try {
      const response = await fetch('../items.json');
      if (!response.ok) throw new Error(`Failed to load items: HTTP ${response.status}`);
      const items = await response.json();
      return items;
    } catch (err) {
      console.error('Failed to fetch items:', err);
      const container = document.getElementById('itemsContainer');
      if (container) {
        container.innerHTML = '<p>Error loading items. Please try again later.</p>';
      }
      return [];
    }
  }