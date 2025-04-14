import { getItems } from './item-manager.js';

export function calculatePaymentSummary() {
    const items = getItems();
    const summaryContainer = document.getElementById('summary-container');
    summaryContainer.innerHTML = ''; // Clear previous summary
    
    // Find all person rows
    const personElements = document.querySelectorAll('.person-row');
    
    if (personElements.length === 0) {
      summaryContainer.innerHTML = '<p>No people added yet.</p>';
      return;
    }
    
    personElements.forEach(personElement => {
      const personId = personElement.id;
      const nameInput = personElement.querySelector('input.person-name');
      const personName = nameInput.value || 'Unnamed Person';
      
      // Create summary section for this person
      const personSummary = document.createElement('div');
      personSummary.className = 'summary-person';
      
      const personHeader = document.createElement('h3');
      personHeader.textContent = personName;
      personSummary.appendChild(personHeader);
      
      // Find all orders for this person
      const orderContainer = document.getElementById(`${personId}-orders`);
      const orderRows = orderContainer.querySelectorAll('.order-row');
      
      let personTotal = 0;
      
      if (orderRows.length === 0) {
        const noOrdersMsg = document.createElement('p');
        noOrdersMsg.textContent = 'No orders added yet.';
        personSummary.appendChild(noOrdersMsg);
      } else {
        orderRows.forEach(orderRow => {
          const itemSelector = orderRow.querySelector('.item-selector');
          const quantitySelector = orderRow.querySelector('.item-quantity');
          
          const selectedItemId = itemSelector.value;
          const selectedItem = items.find(item => item.id === selectedItemId);
          
          if (selectedItem) {
            const quantity = parseInt(quantitySelector.value);
            const unitPrice = parseFloat(selectedItem.price);
            const orderCost = quantity * unitPrice;
            
            personTotal += orderCost;
            
            // Create summary line for this order
            const orderSummary = document.createElement('div');
            orderSummary.className = 'summary-order';
            
            const orderDetails = document.createElement('div');
            orderDetails.className = 'order-details';
            orderDetails.textContent = `${quantity} x ${selectedItem.name} @ €${unitPrice.toFixed(2)} each`;
            
            const orderCostElement = document.createElement('div');
            orderCostElement.className = 'order-cost';
            orderCostElement.textContent = `€${orderCost.toFixed(2)}`;
            
            orderSummary.appendChild(orderDetails);
            orderSummary.appendChild(orderCostElement);
            personSummary.appendChild(orderSummary);
          }
        });
        
        // Add total for this person
        const personTotalDiv = document.createElement('div');
        personTotalDiv.className = 'person-total';
        
        const totalLabel = document.createElement('div');
        totalLabel.textContent = 'Total:';
        
        const totalAmount = document.createElement('div');
        totalAmount.textContent = `€${personTotal.toFixed(2)}`;
        
        personTotalDiv.appendChild(totalLabel);
        personTotalDiv.appendChild(totalAmount);
        personSummary.appendChild(personTotalDiv);
      }
      
      summaryContainer.appendChild(personSummary);
    });
}