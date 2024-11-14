const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

form.addEventListener('submit', handleFormSubmit);
window.addEventListener('load', displayExpenses);

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('expense-name').value.trim();
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;
  const date = document.getElementById('expense-date').value || new Date().toISOString().slice(0, 10);

  if (!name || amount <= 0 || !category) {
    alert('Please fill in all required fields correctly.');
    return;
  }

  const newExpense = { id: Date.now(), name, amount, category, date };
  expenses.push(newExpense);
  saveAndDisplayExpenses();
  form.reset();
}

function displayExpenses() {
  expenseList.innerHTML = '';
  let totalAmount = 0;

  expenses.forEach(expense => {
    totalAmount += expense.amount;
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      ${expense.name} - ₹${expense.amount} - ${expense.category} - ${expense.date}
      <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;

    expenseList.appendChild(listItem);
  });

  totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

function saveAndDisplayExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-category').value = expense.category;
  document.getElementById('expense-date').value = expense.date;

  expenses = expenses.filter(exp => exp.id !== id);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveAndDisplayExpenses();
}
