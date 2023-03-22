/* // Fetch data from JSON file
const booksArray = [];
fetch('books.json')
    .then(response => response.json())
    .then(data => { 
        booksArray.push(...data);
        renderAllProducts();
       
    }) */
   

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
const body = document.querySelector('body');
const container = document.querySelector('.container');
const header = createDomElem(container, 'header');
const headerContent = createDomElem(header, 'h1', undefined, undefined, 'BOOKstore');
const main = createDomElem(container, 'main');
const confirmLink = createDomElem(main, 'a', 'confirm', undefined);
confirmLink.setAttribute('href', 'order.html');
const confirmButton = createDomElem(confirmLink, 'button', 'confirm-button', undefined, 'confirm');
const cart = createDomElem(main, 'div', "cart", undefined);
const cartCountElement = createDomElem(main, 'div', 'hidden', undefined, `You have 0 book(s) in your cart.`);
const cartHeader = createDomElem(cart, 'h2', 'cart-header', undefined, 'PLACE YOUR ORDERS HERE');
const cartListContainer = createDomElem(main, 'div', 'cart-container-hidden', undefined);
const cartList = createDomElem(cartListContainer, 'ol', 'cart-list', undefined);



/* const cartListElement2 = createDomElem(cartListContainer, 'h4', 'cart-header', undefined, 'PLACE YOUR ORDERS HERE'); */
const showHideElem = document.querySelector('.show-hide');

const cards = createDomElem(main, 'div', 'cards'); 
const footer = createDomElem(container, 'footer', undefined, undefined);
const footerContacts = createDomElem(footer, 'h2', 'contacts', undefined, 'Contacts');
const footeraddress = createDomElem(footer, 'h3', 'address', undefined, 'Address: 704 Hintz Park, Suite 391, 77824-4392,<br> West Murray, Wyoming,<br> United States ');
const footerPhone = createDomElem(footer, 'h3', 'phone', undefined, '+1 202-918-2132');
const footerEmail = createDomElem(footer, 'h3', 'email', undefined, 'office@bookstore.com');
const removeButton = document.querySelector('.remove');
let beingDragged;
let cartCountNum = 0;

// Fetch cart items from JSON file

/* fetch('books.json')
    .then(response => response.json())
    .then(cartItemsArray => { 
        cartArray = cartItemsArray;
        renderAllCartItems();   
    })

 */
const booksArray = [];
/* const cartArray = []; */
fetch('books.json')
    .then(response => response.json())
    .then(productsArray => {
        booksArray.push(...productsArray);
        renderAllProducts();
       
    })
/* /*     .catch(error => {
        console.log(error);
    }); */
 
function renderAllProducts() {
    const cardsContainer = document.querySelector('.cards');
    let bookId = 0;

    // Create a DocumentFragment to store all the cards
    const fragment = new DocumentFragment();

    booksArray.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', `${bookId}-book`);
        card.setAttribute('draggable', `true`);
        

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
        showMore.setAttribute('id', `${bookId}`);
        buttonDiv.appendChild(showMore);
        bookId++;
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

let cartId = 0;

let totalSum;
const cartContent = [];

/* function that creates a modal-window */
function renderModalWindow(id) {
    const popUp = createDomElem(container, 'div', 'pop-up', undefined);
    popUp.innerHTML = `<img class="popup-image" src ='${booksArray[id].imageLink}' alt='Selected book' />
    <div class="popup-description">${booksArray[id].description}</div> <div class="popup-title">${booksArray[id].title}</div>
    <button class="close-popup" type="button">✕</button>`;
   
    };


/* listen to the Show More buttons */
main.addEventListener('click', event => {
    if (event.target.closest('.show')) {
     const itemId = event.target.id;
        renderModalWindow(itemId);

    }
    })


 


/* Add to cart  */
main.addEventListener('click', event => {

    if (event.target.closest('.add')) {
        addToCart(event.target);
    };
   
})

document.addEventListener('drop', event => {
    if(event.target.closest('.cart')) {
        addToCart(beingDragged);
    }
})
document.addEventListener('dragover', event => {
    event.preventDefault();
    
    /*  event.dataTransfer.dropEffect = "copy"; */
  /*   if (event.target.closest('.cart')) {
      event.dataTransfer.dropEffect = 'copy';
     document.body.style.cursor = 'default'
      cart.style.backgroundColor = 'lightgray'; 
     
        
    } */
})

main.addEventListener('dragstart', event => {
       
    if (event.target.closest('.card')) {
        beingDragged = event.target;
   

    }   
   })

function cartSum() {
    totalSum = 0;
    for (let item of cartContent) {
        totalSum += item.price;
    }
}
/* function cartSubstract() {
    totalSum = 0;
    for (let item of cartContent) {
        totalSum += item.price;
    }
} */
function enableConfirm() {
if (cartContent.length > 0) {
        confirmButton.style.display = "block";
  console.log('it worked');
} else {
    confirmButton.style.display = "none";
    }
}

function addToCart(target) {

    const card = target.closest('.card');
    const cardId = card.getAttribute('id');
    const bookId = +cardId.split('-')[0];
    const book = booksArray[bookId];
    const bookTitle = book.title;
    const bookPrice = book.price;
    const bookAuthor = book.author;
    const cartBook = { ...booksArray[bookId], id: cartId };
    
    cartContent.push(cartBook);
    cartId++;
    /* Cart content sum */

    cartSum(); 
    enableConfirm();
   
    /*    console.log(cartContent[bookId].title); */
    renderCart();
    console.log(cartCountNum);




}

//The Number of books in the cart


function renderCart() {
    cartCountNum = cartContent.length;
    cartcount();
    
    
      
    cartList.innerHTML = '';
        

        cartContent.forEach(book => {
    
  
         // Create a new li element to display the books in the cart
           
                const cartListElement = createDomElem(cartList, 'li', 'cart-list', undefined, `${book.title} by ${book.author} - $${book.price}`);
                cartListElement.classList.add('cart-list');
                createDomElem(cartListElement,'button', 'remove', `${book.id}`, 'remove' )
   
            

        });
  // Convert array to JSON string
        const cartContentSaved = JSON.stringify(cartContent);

        // Save JSON string to local storage
    localStorage.setItem("cartContent", cartContentSaved);
/*     console.log(JSON.parse(localStorage.getItem("cartContent"))); */
}

/* Change the cursor on drag */
/* document.addEventListener("dragstart", (event) => {
    const myDragObject = event.target.closest('.card');
    event.dataTransfer.effectAllowed = 'move';
    myDragObject.style.cursor = 'grabbing';
    myDragObject.addEventListener("dragend", (event) => {
        myDragObject.style.cursor = 'default';
     })
});  */


document.addEventListener('click', remove);
/* Click the close pop-up button */
function remove(event) {
    const myTarget = event.target.closest('.remove');
    const popupClose = event.target.closest('.close-popup');
    if (popupClose) {
       
        event.target.closest('.pop-up').remove();
    }
    /* Clisk the remove button */
    if (myTarget) {
        console.log('Clicking');
        const deleteIndex = cartContent.findIndex((item) => item.id == myTarget.id);
    
        cartContent.splice(deleteIndex, 1);
        
        cartSum();
        enableConfirm();
        renderCart();
        // Convert array to JSON string
        const cartContentSaved = JSON.stringify(cartContent);

        // Save JSON string to local storage
        localStorage.setItem("cartContent", cartContentSaved);
        console.log(JSON.parse(localStorage.getItem("cartContent")));

        if (cartCountNum < 1) {
            cartListContainer.classList.toggle('cart-container');
       
            cartListContainer.classList.toggle('cart-container-hidden');
            cartCountElement.classList.remove('cart-count');
            cartCountElement.classList.add('hidden');
        }
    
    }
}



cartCountElement.addEventListener('click', function () {
  const showLine = document.querySelector('.more');
    const hideLine = document.querySelector('.hide');
    console.log('EVENT IS');
    console.log(event.target);
    
    if (event.target.closest('.cart-count')) {
        
        showLine.classList.toggle('invisible');
        hideLine.classList.toggle('invisible');
            
        cartCountElement.classList.toggle('hide-clickme');
        cartListContainer.classList.toggle('cart-container');
       
        cartListContainer.classList.toggle('cart-container-hidden');
       
      
   
    }

})




        // Create a new h2 element to display the cart count
        /*  const cartCountElement = createDomElem(cartCountList, 'li', 'cart-count', undefined, `You have ${cartCount} book(s) in your cart.`); */
function cartcount() {
    
    cartCountElement.innerHTML = `<span>You have ${cartContent.length} book(s) in your cart.</span> <div class="show-hide"> <span class="more"><p>cart details:<span class="sum"> $${totalSum}</p></span></span> <br>  <span class= "hide invisible"><p>click to hide</p></span></div>`;
    const hideLine = document.querySelector('.hide');

            cartCountElement.classList.remove('hidden');
        cartCountElement.classList.add('cart-count');}
    
  
 


       
        // TEST Add each book to the cart list
        // cartListElement.innerHTML = `${bookTitle} by ${bookAuthor} - ${bookPrice}`;
        //}


 
        // Add each book to the cart list
        /*  cartContent.forEach(book => {
             const cartItemElement = document.createElement('li');
             cartItemElement.textContent = `${book.title} by ${book.author} - ${book.price}`;
             cartListElement.appendChild(cartItemElement);
             // Add the cart list to the cart element
             cartElement.appendChild(cartListElement);
         
         }); */
 