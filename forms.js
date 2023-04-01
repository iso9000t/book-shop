/* Get all our elements*/
const mainForm = document.forms.main;
const nameField = mainForm.userName;
const name = nameField.value;
const surname = mainForm.userSurname;
const street = mainForm.street;
const house = mainForm.house;
const flat = mainForm.flat;
const date = mainForm.date;
const gifts = mainForm.elements["gifts[]"];
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const checkboxArray = Array.from(gifts);
let checked;
let unchecked;
let paymentMethod;
let listOfGifts = [];
let stringOfGifts;
const radioButtons = document.getElementsByName('payment');
const completeButton = document.querySelector('.complete');
const giftDiv = document.querySelector(".gift-section");
const warningName = document.getElementById('warningName');
const warningSurname = document.getElementById('warningSurname');
const warningStreet = document.getElementById('warningStreet');
const warningHouse = document.getElementById('warningHouse');
const warningFlat = document.getElementById('warningFlat');
const warningDate = document.getElementById('warningDate');
const cartContent = JSON.parse(localStorage.getItem("cartContent"));
const finalMessage = document.querySelector('.final-message');
const resetButton = document.querySelector('.reset');
let titles;
let bookCounter = 0;



let placeholder;
const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const year = today.getFullYear();
const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
const day = tomorrow.getDate().toString().padStart(2, '0');
let isoDate = `${year}-${month}-${day}`;
date.min = isoDate;



/* PLaceholder empty on input */
mainForm.addEventListener('focusin', (event) => {
    const field = event.target;
    placeholder = field.placeholder; 
    field.placeholder = "";

})


/* Validation*/

mainForm.addEventListener('focusout', function (event) {
    const field = event.target;
    field.placeholder = placeholder;
    
    /* Name check */
    if (field == nameField) {
        if (!field.checkValidity()) {
            warningName.style.top = '163px';
            warningName.classList.remove('invisible');
        } else if (field.checkValidity()) {
            warningName.classList.add('invisible');
        }
     
    }
    
    /* Surname check */
    if (field == surname) {
        if (!field.checkValidity()) {
            warningSurname.style.top = '215px';
            warningSurname.classList.remove('invisible');
        } else if (field.checkValidity()) {
            warningSurname.classList.add('invisible'); 
        }
    }
    /* Street check */
    if (field == street) {
        if (!field.checkValidity()) {
            warningStreet.style.top = '265px';
            warningStreet.classList.remove('invisible');
            
        } else if (field.checkValidity()) {
            warningStreet.classList.add('invisible'); 
        }
    }

     /* House check */
    if (field == house) {
        if (!field.checkValidity()) {
            warningHouse.style.top = '316px';
            warningHouse.classList.remove('invisible');
            
        } else if (field.checkValidity()) {
            warningHouse.classList.add('invisible'); 
        }
    }

        /* Flat check */
    if (field == flat) {
        if (!field.checkValidity()) {
            warningFlat.style.top = '360px';
            warningFlat.classList.remove('invisible');
            
        } else if (field.checkValidity()) {
            warningFlat.classList.add('invisible'); 
        }



    }



})
/* Checkbox auto switch-off */
document.addEventListener("change", function (e) {

     
    if (event.target.closest("input[type=checkbox]")) {
        checked = document.querySelectorAll("input[type=checkbox]:checked");
        unchecked = document.querySelectorAll("input[type=checkbox]:not(:checked)");

        listOfGifts = [];
        for (let i = 0; i < checked.length; i++) {
            listOfGifts.push(checked[i].value);
        } 
        if (checked.length >= 2) {
      
            unchecked.forEach((box) => box.disabled = true);
        } else {unchecked.forEach((box) => box.disabled = false); }
    
    }

    if (mainForm.reportValidity() === true) {
        completeButton.classList.remove('disabled');
        completeButton.disabled = false;
    } else {
        completeButton.classList.add('disabled');
        completeButton.disabled = true;}


});
 
completeButton.addEventListener('click', (e) => {
    /* Find the value of the radiobuttons */
    if (listOfGifts.length > 0) {
        stringOfGifts = listOfGifts.join(' and ');
    } else {stringOfGifts = "no gifts selected"}

    for (let button of radioButtons) {
        if (button.checked) {
            paymentMethod = button.value;
        }

        
    }

    event.preventDefault();
    resetButton.classList.add("disabled");
    completeButton.classList.add("disabled");
    resetButton.disabled = true;
    completeButton.disabled = true;
    mainForm.disabled = true; 
    finalMessage.classList.remove('invisible');
    const deliveryDate = new Date(mainForm.date.value);

    finalMessage.innerHTML = `<p class="message-content">Dear ${nameField.value} ${surname.value}, your order has been accepted. Your order details:<br> 
    Your books:<br> ${allTitles()},<br> total sum: $${totalPrice()}.<br> The delivery is scheduled for ${deliveryDate.toDateString()}.<br> The delivery address is: ${street.value}, building ${house.value}, apartment ${flat.value}.<br> Selected presents: ${stringOfGifts}.<br>  Payment method: ${paymentMethod}.
     </p><button type="submit" class="finish" form="my-form">Send</button>`;
    

    
 })


function sumbitForm() {
    mainForm.disabled = false; 
    resetButton.disabled = false;
    completeButton.disabled = true;
   /*  completeButton.classList("disabled"); */
   /*  finalMessage.innerHTML = "<p class='final'>ORDER SUBMITTED</p>"; */
    /* mainForm.submit(); */
 }

function allTitles () {
    titles = cartContent.map(book => `${++bookCounter}) ${book.title} by ${book.author}"`);
    titlesString = titles.join(',<br> ')
    return titlesString;
}

function totalPrice () {
sum = 0
    for (const book of cartContent) {
        sum += book.price;
    }
    return sum;


}


