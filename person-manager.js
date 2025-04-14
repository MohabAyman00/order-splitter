import { getItems, updateAllItemDropdowns } from './item-manager.js';

let personCounter = 0;
let orderCounter = 0;

export function createPersonRow() {
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
    nameInput.id = `person-name-${personCounter}`;
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
      document.getElementById(rowId).remove();
      document.getElementById(`${rowId}-orders`).remove();
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

export function addOrderToPersonRow(personRowId) {
    const items = getItems();
    orderCounter++;
    const orderId = `order-${orderCounter}`;
    
    const ordersContainer = document.getElementById(`${personRowId}-orders`);
    const orderRow = document.createElement('div');
    orderRow.className = 'order-row';
    orderRow.id = orderId;
    
    // Create item selector dropdown
    const itemSelect = document.createElement('select');
    itemSelect.className = 'item-selector';
    itemSelect.dataset.personId = personRowId;
    itemSelect.id = `${orderId}-item`;
    
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
    quantitySelect.dataset.personId = personRowId;
    quantitySelect.id = `${orderId}-quantity`;
    
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