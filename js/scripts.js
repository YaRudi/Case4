// Модель данных для книг
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2020, price: 20.5, available: true },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2018, price: 15.75, available: true },
    { id: 3, title: 'Book 3', author: 'Author 3', year: 2015, price: 30, available: false }
];

// Функция отображения всех книг
function displayBooks() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            ${book.available ? '<p>Status: Available</p>' : '<p>Status: Not available</p>'}
            <button onclick="viewBook(${book.id})">View Details</button>
        `;
        booksDiv.appendChild(bookDiv);
    });
}

// Функция просмотра деталей книги
function viewBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        window.location.href = 'book_details.html';
    } else {
        alert('Book not found');
    }
}

// Функция отображения деталей выбранной книги
function displayBookDetails() {
    const bookDetailsDiv = document.getElementById('bookDetails');
    const currentBook = JSON.parse(localStorage.getItem('currentBook'));

    if (currentBook) {
        bookDetailsDiv.innerHTML = `
            <h2>${currentBook.title}</h2>
            <p><strong>Author:</strong> ${currentBook.author}</p>
            <p><strong>Year:</strong> ${currentBook.year}</p>
            <p><strong>Price:</strong> $${currentBook.price}</p>
            ${currentBook.available ? '<p>Status: Available</p>' : '<p>Status: Not available</p>'}
            <button onclick="buyOrRentBook(${currentBook.id})">Buy/Rent</button>
        `;
    } else {
        bookDetailsDiv.innerHTML = '<p>Book details not available</p>';
    }
}

// Функция покупки или аренды книги
function buyOrRentBook(bookId) {
    const currentBook = books.find(book => book.id === bookId);
    if (currentBook) {
        const duration = prompt('Enter duration for rent (2 weeks, 1 month, 3 months):');
        if (duration === '2 weeks' || duration === '1 month' || duration === '3 months') {
            alert(`You have rented "${currentBook.title}" for ${duration}`);
        } else {
            alert('Invalid duration input');
        }
    } else {
        alert('Book not found');
    }
}

// Функция добавления новой книги (для администратора)
function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const price = parseFloat(document.getElementById('price').value);

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        year: year,
        price: price,
        available: true
    };

    books.push(newBook);
    alert('Book added successfully');
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = 'admin.html';
}

// Функция для регистрации пользователя
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password, isAdmin: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    window.location.href = 'login.html';
}

// Функция для авторизации пользователя
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert('Invalid username or password');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful');
    if (user.isAdmin) {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Функция для выхода пользователя из системы
function logoutUser() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
    window.location.href = 'login.html';
}

// Инициализация страницы
function initialize() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAdmin) {
        // Администратор авторизован
        displayAdminInterface();
    } else {
        // Пользователь или администратор не авторизованы
        displayUserInterface();
    }
}

// Функция отображения интерфейса администратора
function displayAdminInterface() {
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('userPanel').style.display = 'none';
}

// Функция отображения интерфейса пользователя
function displayUserInterface() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('userPanel').style.display = 'block';
}

// Инициализация при загрузке страницы
initialize();
