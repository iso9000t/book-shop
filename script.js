/* const booksArray =[{
  "author": "Douglas Crockford",
  "imageLink": "/image/Douglas-Crockford.jpg",
  "title": "JavaScript: The Good Parts: The Good Parts",
  "price": 30,
  "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
},
  {
    "author": "David Herman",
    "imageLink": "/image/David-Herman.jpg",
    "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
    "price": 22,
    "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
  },
  {
    "author": "David Flanagan",
    "imageLink": "/image/David-Flanagan.jpg",
    "title": "JavaScript: The Definitive Guide",
    "price": 40,
    "description": "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript"
  },
  {
    "author": " Eric Elliott",
    "imageLink": "/image/Eric-Elliott.jpg",
    "title": "Programming JavaScript Applications",
    "price": 19,
    "description": "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows."
  },
  {
    "author": "Addy Osmani",
    "imageLink": "/image/Addy-Osmani.jpg",
    "title": "Learning JavaScript Design Patterns",
    "price": 32,
    "description": "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
  },
  {
    "author": "Boris Cherny",
    "imageLink": "/image/Boris-Cherny.jpg",
    "title": "Programming TypeScript",
    "price": 28,
    "description": "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system."
  },
  {
    "author": "Alex Banks, Eve Porcello",
    "imageLink": "/image/Alex-Banks_Eve-Porcello.jpg",
    "title": "Learning React, 2nd Edition",
    "price": 25,
    "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary."
  },
  {
    "author": "Bradley Meck Alex Young and Mike Cantelon",
    "imageLink": "/image/Bradley-Meck_Alex-Young_Mike-Cantelon.jpg",
    "title": "Node.js in Action",
    "price": 38,
    "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
  },
  {
    "author": "Kyle Simpson",
    "imageLink": "/image/Kyle-Simpson.jpg",
    "title": "You Don't Know JS Yet: Get Started",
    "price": 26,
    "description": "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!"
  },
  {
    "author": "John Resig and Bear Bibeault",
    "imageLink": "/image/John-Resig_Bear-Bibeault.jpg",
    "title": "Secrets of the JavaScript Ninja",
    "price": 33,
    "description": "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up."
  }
] */
/////////Creating all the newElements for layout
function createDomElem(parentElement, newTagIs, newElemClass = "", newElemID = "", textContent = "") {
    const fragment = document.createDocumentFragment();
    const newElem = document.createElement(newTagIs);
    if(newElemClass) newElem.classList.add(newElemClass);
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
const main = createDomElem(container, 'main');
const cart = createDomElem(main, 'div', "cart", undefined);
const cartCountElement = createDomElem(main, 'div', 'hidden', undefined, `You have 0 book(s) in your cart.`);
const cartHeader = createDomElem(cart, 'h2', 'cart-header', undefined, 'PLACE YOUR ORDERS HERE');
const cartLine1 = createDomElem(cart, 'h2', 'cart-header', undefined, 'PLACE YOUR ORDERS HERE');
const cartLine3 = createDomElem(cart, 'h2', 'cart-header', undefined, 'PLACE YOUR ORDERS HERE');
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
    let bookId = 0;

    // Create a DocumentFragment to store all the cards
    const fragment = new DocumentFragment();

    booksArray.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', `${bookId}-book`);
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



/* Add to cart  */
const cartContent = [];
let booksAmount = 0;
/* get the parent elemt for delegation */
main.addEventListener('click', event => {
    booksAmount++;
    if (event.target.closest('.add')) {
        console.log('CLICK');    
        addToCart();
    };
   
})

function addToCart() {
    const card = event.target.closest('.card');
        const cardId = card.getAttribute('id');
        const bookId = +cardId.split('-')[0];
        const book = booksArray[bookId];
        const bookTitle = book.title;
        const bookPrice = book.price;
       // Add the book to the cart array
        cartContent.push(book);
    console.log(cartContent[bookId].title);
       updateCartDisplay(); 
}

function updateCartDisplay() {
    const cartElement = document.querySelector('.cart');
    const cartCount = cartContent.length;

    // Create a new h2 element to display the cart count
    /* const cartCountElement = createDomElem(main, 'div', 'cart-count', undefined, `You have ${cartCount} book(s) in your cart.`); */
    cartCountElement.innerHTML = `You have ${cartCount} book(s) in your cart.`;
    cartCountElement.classList.add('cart-count');

/*     // Create a new div element to display the books in the cart
    const cartListElement = createDomElem(cartCountElement, 'div', 'cart-list', undefined);
    cartListElement.classList.add('cart-list');

    // TEST Add each book to the cart list
    cartListElement.innerHTML = `${book.title} by ${book.author} - ${book.price}`;
 */
    // Add each book to the cart list
   /*  cartContent.forEach(book => {
        const cartItemElement = document.createElement('li');
        cartItemElement.textContent = `${book.title} by ${book.author} - ${book.price}`;
        cartListElement.appendChild(cartItemElement);
        // Add the cart list to the cart element
        cartElement.appendChild(cartListElement);
    
    }); */
}