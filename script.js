// Counters to generate unique IDs
let itemCounter = 0;
let personCounter = 0;
let orderCounter = 0;

// Store item data for reference
const items = [];

// Function to create a new item row
function createItemRow() {
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

// Function to create a new person row
function createPersonRow() {
  personCounter++;
  const rowId = `person-${personCounter}`;
  
  const container = document.getElementById('people-container');
  const rowDiv = document.createElement('div');
  rowDiv.className = 'person-row';
  rowDiv.id = rowId;
  
  // Create person name input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'person-name';
  nameInput.placeholder = 'Person Name';
  
  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = function() {
    document.getElementById(rowId).remove();
  };
  
  // Create "Add Order" button
  const addOrderBtn = document.createElement('button');
  addOrderBtn.className = 'add-order-btn';
  addOrderBtn.textContent = 'Add Order';
  addOrderBtn.onclick = function() {
    addOrderToPersonRow(rowId);
  };
  
  // Add elements to the row
  rowDiv.appendChild(nameInput);
  rowDiv.appendChild(addOrderBtn);
  rowDiv.appendChild(removeBtn);
  
  // Create orders container (initially empty)
  const ordersContainer = document.createElement('div');
  ordersContainer.className = 'orders-container';
  ordersContainer.id = `${rowId}-orders`;
  
  // Add the row and orders container to the main container
  container.appendChild(rowDiv);
  container.appendChild(ordersContainer);
}

// Function to add an order to a person row
function addOrderToPersonRow(personRowId) {
  orderCounter++;
  const orderId = `order-${orderCounter}`;
  
  const ordersContainer = document.getElementById(`${personRowId}-orders`);
  const orderRow = document.createElement('div');
  orderRow.className = 'order-row';
  orderRow.id = orderId;
  
  // Create item selector dropdown
  const itemSelect = document.createElement('select');
  itemSelect.className = 'item-selector';
  
  // Populate with available items
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  });
  
  // Create quantity selector for this item
  const quantitySelect = document.createElement('select');
  quantitySelect.className = 'item-quantity';
  
  // Default to first item in the list for initial quantity options
  if (items.length > 0) {
    const maxCount = items[0].maxCount || 1;
    for (let i = 1; i <= maxCount; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }
  }
  
  // Update quantity options when item selection changes
  itemSelect.addEventListener('change', function() {
    const selectedItemId = itemSelect.value;
    const selectedItem = items.find(item => item.id === selectedItemId);
    
    if (selectedItem) {
      // Clear current options
      quantitySelect.innerHTML = '';
      
      // Add new options based on selected item's max count
      const maxCount = selectedItem.maxCount || 1;
      for (let i = 1; i <= maxCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        quantitySelect.appendChild(option);
      }
    }
  });
  
  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = function() {
    document.getElementById(orderId).remove();
  };
  
  // Add elements to the order row
  orderRow.appendChild(itemSelect);
  orderRow.appendChild(quantitySelect);
  orderRow.appendChild(removeBtn);
  
  // Add the order row to the container
  ordersContainer.appendChild(orderRow);
}

// Function to update all item dropdowns in the people section
function updateAllItemDropdowns() {
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

document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners for the add buttons
  document.getElementById('add-item-btn').addEventListener('click', createItemRow);
  document.getElementById('add-person-btn').addEventListener('click', createPersonRow);
});