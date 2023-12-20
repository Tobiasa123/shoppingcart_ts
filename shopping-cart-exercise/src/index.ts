//när man klickar på cart ska carten öppnas
//card wrapper är hidden i html så toggla det

const productButtons: NodeList = document.querySelectorAll("button");
const shoppingCart: (string | null)[] = [];
const cart: HTMLElement | null = document.querySelector("#cart");
const openCartButton: HTMLElement | null = document.querySelector("#open-cart");
const productsElement = document.querySelector('#products');

//cartCounter
let cartCounter = 0;
let cartAmount = document.querySelector("#productsInCart") as HTMLElement

//Pusha product till shoppingcart
function updateCart(newProduct): void {
  shoppingCart.push(newProduct)
  cartCounter++;

  cartAmount.innerText = cartCounter.toString()
  listProductsInCart(shoppingCart)
}

function addClickEvent(): void {

  //eventlistene på cart
  openCartButton.addEventListener('click', () => {
    cart.classList.toggle("hide");
  })

  //eventlistener på produkternas knappar
  productButtons.forEach((element) => {
    element.addEventListener('click', () => {
      //få attribute av buttons parentelement, datan är även titeln
        const productData = element.parentElement?.getAttribute('data-product');

        if (!shoppingCart.includes(productData)){
          //console.log(productData);
        updateCart(productData)
        }else{
          window.alert("Already added to cart :D")
        }

    });
});
  // Void betyder att funktionen ej returnerar något värde
  // För att kunna använda parentElement behöver vi göra om det till ett HTMLElement istället för typen EventTarget
}

//lista produkterna
function listProductsInCart(elementData): void {
  console.log(elementData)
  //styla med inline css på span
  //map eller br för seprate lines
  //övning 3 lägg till en removebutton
  productsElement.innerHTML = elementData.map(item => 
    `<li>
    <span style ="font-weight: bold;">Titel:</span>
     ${item} 
     <button class="removeButton">Remove</button>
     </li>`).join('');

     //lägg till remove eventlisteners påvarje removeButton
    const removeButtons = document.querySelectorAll(".removeButton")
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        let itemToRemove = e.target
        removeItems(itemToRemove)
      })
    });

}

function removeItems(position){
  //ta bort 1 element på position(index)
  shoppingCart.splice(position, 1)
  cartCounter--;
  cartAmount.innerText = cartCounter.toString();
  listProductsInCart(shoppingCart);
}


addClickEvent();

