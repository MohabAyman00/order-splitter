import { createItemRow } from './item-manager.js';
import { createPersonRow } from './person-manager.js';
import { calculatePaymentSummary } from './order-calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Remove active class from all buttons and contents
          tabBtns.forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          // Add active class to clicked button and corresponding content
          btn.classList.add('active');
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Set up event listeners for the add buttons
  document.getElementById('add-item-btn').addEventListener('click', createItemRow);
  document.getElementById('add-person-btn').addEventListener('click', createPersonRow);
  document.getElementById('calculate-btn').addEventListener('click', calculatePaymentSummary);
});