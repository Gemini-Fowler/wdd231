export async function fetchItems() {
    try {
      const response = await fetch('/data/items.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const items = await response.json();
      return items;
    } catch (err) {
      console.error('Failed to fetch items:', err);
      return [];
    }
  }
  