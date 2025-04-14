let itemCounter = 0;
const items = [];

export function createItemRow() {
    itemCounter++;
    const rowId = `item-${itemCounter}`;
    
    const container = document.getElementById('items-container');
    const rowDiv = document.createElement('div');
    rowDiv.className = 'item-row';
    rowDiv.id = rowId;
    
    // Create item name input
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'item-name';
    nameInput.placeholder = 'Item Name';
    nameInput.id = `item-name-${itemCounter}`;
    
    // Create unit price input (numbers only)
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.className = 'unit-price';
    priceInput.placeholder = 'Unit Price';
    priceInput.min = '0';
    priceInput.step = '0.01';
    priceInput.id = `item-price-${itemCounter}`;
    
    // Create count dropdown (1-10)
    const countSelect = document.createElement('select');
    countSelect.className = 'item-count';
    countSelect.id = `item-count-${itemCounter}`;
    
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      countSelect.appendChild(option);
    }
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
      // Remove from items array
      const index = items.findIndex(item => item.id === rowId);
      if (index !== -1) {
        items.splice(index, 1);
      }
      
      // Remove from DOM
      document.getElementById(rowId).remove();
      
      // Update all person order dropdowns
      updateAllItemDropdowns();
    };
    
    // Add all elements to the row
    rowDiv.appendChild(nameInput);
    rowDiv.appendChild(priceInput);
    rowDiv.appendChild(countSelect);
    rowDiv.appendChild(removeBtn);
    
    // Add the row to the container
    container.appendChild(rowDiv);
    
    // Add item to array when inputs change
    const updateItemData = function() {
      const index = items.findIndex(item => item.id === rowId);
      const itemData = {
        id: rowId,
        name: nameInput.value || `Item ${itemCounter}`,
        price: priceInput.value || 0,
        maxCount: countSelect.value
      };
      
      if (index !== -1) {
        items[index] = itemData;
      } else {
        items.push(itemData);
      }
      
      // Update all person order dropdowns
      updateAllItemDropdowns();
    };
    
    nameInput.addEventListener('input', updateItemData);
    priceInput.addEventListener('input', updateItemData);
    countSelect.addEventListener('change', updateItemData);
    
    // Initial data
    items.push({
      id: rowId,
      name: `Item ${itemCounter}`,
      price: 0,
      maxCount: 1
    });
}

export function updateAllItemDropdowns() {
    const itemSelectors = document.querySelectorAll('.item-selector');
    
    itemSelectors.forEach(selector => {
      const currentValue = selector.value;
      
      // Clear current options
      selector.innerHTML = '';
      
      // Add options for each item
      items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        selector.appendChild(option);
      });
      
      // Try to restore previous selection
      if (items.some(item => item.id === currentValue)) {
        selector.value = currentValue;
      }
      
      // Trigger change event to update quantity
      const event = new Event('change');
      selector.dispatchEvent(event);
    });
}

export function getItems() {
    return items;
}