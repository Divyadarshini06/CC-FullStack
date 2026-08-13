const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const bookResults = document.getElementById("bookResults");
const message = document.getElementById("message");

async function searchBooks() {

    const searchTerm = searchInput.value.trim();

    // Check if input is empty
    if (searchTerm === "") {
        message.textContent = "Please enter a book name!";
        bookResults.innerHTML = "";
        return;
    }

    // Show loading message
    message.textContent = "Searching books...";
    bookResults.innerHTML = "";

    try {
        // REST API request
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`
        );

        // Check response
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Convert API response to JSON
        const data = await response.json();

        // Check if books are found
        if (data.numFound === 0) {
            message.textContent = "No books found!";
            return;
        }

        message.textContent = `Found ${data.numFound} books. Showing top 20 results.`;

        // Get only first 20 books
        const books = data.docs.slice(0, 20);

        // Display each book
        books.forEach(book => {

            const title = book.title || "Title not available";

            const author = book.author_name
                ? book.author_name[0]
                : "Author not available";

            const year = book.first_publish_year || "Year not available";

            const publisher = book.publisher
                ? book.publisher[0]
                : "Publisher not available";

            // Book cover URL
            const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null;

            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                ${
                    coverUrl
                        ? `<img src="${coverUrl}" alt="${title}">`
                        : `<div class="no-image">No Cover Available</div>`
                }

                <h3>${title}</h3>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Published:</strong> ${year}</p>
                <p><strong>Publisher:</strong> ${publisher}</p>
            `;

            bookResults.appendChild(bookCard);
        });

    } catch (error) {
        console.error(error);
        message.textContent = "Something went wrong. Please try again!";
    }
}

// Search when button is clicked
searchBtn.addEventListener("click", searchBooks);

// Search when Enter key is pressed
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchBooks();
    }
});