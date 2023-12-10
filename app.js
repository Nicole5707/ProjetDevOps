// Function to add a new book
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
  
    // Perform API request to add book
    fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, year }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      return response.json();
    })
    .then(data => {
      console.log('Book added successfully:', data);
      // Refresh the book list
      fetchBookList();
    })
    .catch(error => {
      console.error('Error adding book:', error);
      // Handle error (e.g., show an error message to the user)
    });
  }
  
// Function to fetch and display the list of books
function fetchBookList() {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(books => {
        const bookListContainer = document.getElementById('bookList');
        bookListContainer.innerHTML = '';
  
        books.forEach(book => {
          const bookItem = document.createElement('div');
          bookItem.classList.add('book');
          bookItem.setAttribute('data-book-id', book._id);
  
          // Display book information
          const bookInfo = document.createElement('div');
          bookInfo.classList.add('book-info');
          bookInfo.innerHTML = `<strong>${book.title}</strong> by ${book.author}, Year: ${book.year}`;
          bookItem.appendChild(bookInfo);
  
          // Display edit and delete buttons
          const bookButtons = document.createElement('div');
          bookButtons.classList.add('book-buttons');
          const editButton = document.createElement('button');
          editButton.classList.add('edit');
          editButton.innerText = 'Edit';
          bookButtons.appendChild(editButton);
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete');
          deleteButton.innerText = 'Delete';
          bookButtons.appendChild(deleteButton);
          bookItem.appendChild(bookButtons);
  
          bookListContainer.appendChild(bookItem);
  
          // Attach click event listeners to the edit and delete buttons
          editButton.addEventListener('click', () => editBook(book._id, book.title, book.author, book.year));
          deleteButton.addEventListener('click', () => deleteBook(book._id));
        });
      })
      .catch(error => console.error('Error fetching book list:', error));
  }
 
  
  // Function to edit a book
  function editBook(bookId, currentTitle, currentAuthor, currentYear) {
    // Create a form for editing
    const form = document.createElement('form');
  
    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = currentTitle;
    form.appendChild(titleInput);
  
    // Author input
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.value = currentAuthor;
    form.appendChild(authorInput);
  
    // Year input
    const yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.value = currentYear;
    form.appendChild(yearInput);
  
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.innerText = 'Submit';
    submitButton.onclick = () => {
      const newTitle = titleInput.value;
      const newAuthor = authorInput.value;
      const newYear = yearInput.value;
  
      // Perform API request to edit book
      fetch(`http://localhost:3000/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, author: newAuthor, year: newYear }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to edit book');
        }
            // Refresh the book list
        fetchBookList();
        return response.json();
      })
      .then(data => {
        console.log('Book edited successfully:', data);
      })
      .catch(error => {
        console.error('Error editing book:', error);
        // Handle error (e.g., show an error message to the user)
      });
  
      // Remove the form after submitting
      form.remove();
    };
    form.appendChild(submitButton);
  
    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.innerText = 'Cancel';
    cancelButton.onclick = () => {
      // Remove the form if canceled
      form.remove();
    };
    form.appendChild(cancelButton);
  
    // Replace the book info with the form
    const bookInfo = document.querySelector(`[data-book-id="${bookId}"] .book-info`);
    bookInfo.innerHTML = '';
    bookInfo.appendChild(form);
  }
  
  // Function to delete a book
  function deleteBook(bookId) {
    // Perform API request to delete book
    fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      fetchBookList();
      return response.json();
    })
    .then(data => {
      console.log('Book deleted successfully:', data);
      // Refresh the book list
    //   fetchBookList();
    })
    .catch(error => {
      console.error('Error deleting book:', error);
      // Handle error (e.g., show an error message to the user)
    });
  }
  
  // Fetch and display the initial book list
  fetchBookList();
  



