//your JS code here. If required.
// script.js

// Get DOM elements
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const submitBtn = document.getElementById('submit');
const bookList = document.getElementById('book-list');
const alertContainer = document.getElementById('alert-container');

// Function to show alerts
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Function to clear form inputs
function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
}

// Function to validate inputs
function validateInputs() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const isbn = isbnInput.value.trim();

    if (!title || !author || !isbn) {
        showAlert('Please fill in all fields!', 'danger');
        return false;
    }

    // Basic ISBN validation (check if it contains numbers and dashes)
    const isbnPattern = /^[0-9\-]+$/;
    if (!isbnPattern.test(isbn)) {
        showAlert('Please enter a valid ISBN number!', 'danger');
        return false;
    }

    return true;
}

// Function to add book to table
function addBook() {
    if (!validateInputs()) {
        return;
    }

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const isbn = isbnInput.value.trim();

    // Create new row
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><button class="delete" onclick="deleteBook(this)">Clear</button></td>
    `;

    // Add row to table
    bookList.appendChild(row);

    // Clear form and show success message
    clearForm();
    showAlert('Book added successfully!', 'success');
}

// Function to delete book row
function deleteBook(button) {
    const row = button.closest('tr');
    row.remove();
    showAlert('Book removed successfully!', 'info');
}

// Event listeners
submitBtn.addEventListener('click', addBook);

// Allow Enter key to submit form
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addBook();
    }
});

// Add focus to first input on page load
window.addEventListener('load', function() {
    titleInput.focus();
});

// Alternative approach using event delegation for delete buttons
// This is more efficient for dynamically added elements
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
        showAlert('Book removed successfully!', 'info');
    }
});