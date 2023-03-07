
/////////Creating all the newElements for layout
function createDomElem(parentElement, newTagIs, newElemClass = "", newElemID = "", textContent = "") {
    const fragment = document.createDocumentFragment();
    const newElem = document.createElement(newTagIs);
    if(newElemClass)  newElem.classList.add(newElemClass);
    if(newElemID) { newElem.setAttribute('id', newElemID); }
    if(textContent) newElem.insertAdjacentHTML('beforeend', textContent);
    fragment.appendChild(newElem);
    parentElement.appendChild(fragment);
    return newElem;
}

//// all elements
const container = document.querySelector('.container');
const header = createDomElem(container, 'header');
const headerContent = createDomElem(header, 'h1', undefined, undefined, 'BOOKstore');
const cart = createDomElem(header, 'div', "cart", undefined);
const main = createDomElem(container, 'main');
const cards = createDomElem(main, 'div', 'cards'); 
const footer = createDomElem(container, 'footer', undefined, undefined);
const footerContacts = createDomElem(footer, 'h2', 'contacts', undefined, 'Contacts');
const footeraddress = createDomElem(footer, 'h3', 'address', undefined, 'Address: 704 Hintz Park, Suite 391, 77824-4392,<br> West Murray, Wyoming,<br> United States ');
const footerPhone = createDomElem(footer, 'h3', 'phone', undefined, '+1 202-918-2132');
const footerEmail = createDomElem(footer, 'h3', 'email', undefined, 'office@bookstore.com');







// Fetch data from JSON file
const booksArray = [];
fetch('books.json')
    .then(response => response.json())
    .then(data => { 
        booksArray.push(...data);
        bookDraw();
       
    })
    .catch(error => console.error(error));


function bookDraw() {
    const cardsContainer = document.querySelector('.cards');
    let bookId = 1;

    // Create a DocumentFragment to store all the cards
    const fragment = new DocumentFragment();

    booksArray.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', `book-${bookId}`);
        bookId++;

       

        const img = document.createElement('img');
        img.src = book.imageLink;
        img.alt = book.title;
        card.appendChild(img);

         const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        card.appendChild(buttonDiv);

        const showMore = document.createElement('button');
        showMore.textContent = 'Show more';
        showMore.classList.add("show");
        buttonDiv.appendChild(showMore);

        const addToCart = document.createElement('button');
        addToCart.textContent = 'Add to Cart';
        addToCart.classList.add("add");
        buttonDiv.appendChild(addToCart);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h2');
        title.textContent = book.title;
        cardContent.appendChild(title);

        const author = document.createElement('p');
        author.innerHTML = `<span>Author:</span> ${book.author}`;
        cardContent.appendChild(author);

        const price = document.createElement('p');
        price.innerHTML = `<span class="price">Price:</span> $${book.price}`;
        card.appendChild(price);

        card.appendChild(cardContent);

        // Add card to the fragment
        fragment.appendChild(card);
    });

    // Append all the cards to the container
    cardsContainer.appendChild(fragment);
}
