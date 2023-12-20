//när man klickar på cart ska carten öppnas
//card wrapper är hidden i html så toggla det
const productButtons = document.querySelectorAll("button");
const shoppingCart = [];
const cart = document.querySelector("#cart");
const openCartButton = document.querySelector("#open-cart");
const productsElement = document.querySelector('#products');
//cartCounter
let cartCounter = 0;
let cartAmount = document.querySelector("#productsInCart");
//Pusha product till shoppingcart
function updateCart(newProduct) {
    shoppingCart.push(newProduct);
    cartCounter++;
    cartAmount.innerText = cartCounter.toString();
    listProductsInCart(shoppingCart);
}
function addClickEvent() {
    //eventlistene på cart
    openCartButton.addEventListener('click', () => {
        cart.classList.toggle("hide");
    });
    //eventlistener på produkternas knappar
    productButtons.forEach((element) => {
        element.addEventListener('click', () => {
            var _a;
            //få attribute av buttons parentelement, datan är även titeln
            const productData = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-product');
            if (!shoppingCart.includes(productData)) {
                //console.log(productData);
                updateCart(productData);
            }
            else {
                window.alert("Already added to cart :D");
            }
        });
    });
    // Void betyder att funktionen ej returnerar något värde
    // För att kunna använda parentElement behöver vi göra om det till ett HTMLElement istället för typen EventTarget
}
//lista produkterna
function listProductsInCart(elementData) {
    console.log(elementData);
    //styla med inline css på span
    //map eller br för seprate lines
    //övning 3 lägg till en removebutton
    productsElement.innerHTML = elementData.map(item => `<li>
    <span style ="font-weight: bold;">Titel:</span>
     ${item} 
     <button class="removeButton">Remove</button>
     </li>`).join('');
    //lägg till remove eventlisteners påvarje removeButton
    const removeButtons = document.querySelectorAll(".removeButton");
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let itemToRemove = e.target;
            removeItems(itemToRemove);
        });
    });
}
function removeItems(position) {
    //ta bort 1 element på position(index)
    shoppingCart.splice(position, 1);
    cartCounter--;
    cartAmount.innerText = cartCounter.toString();
    listProductsInCart(shoppingCart);
}
addClickEvent();
