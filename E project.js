// cart
let cartIcon=document.querySelector('#cart-icons');
let cart=document.querySelector('.cart');
let closeCart=document.querySelector('#close-cart');





//open cart
cartIcon.addEventListener('click',function(){
    cart.classList.add('cart-active');
})
// close cart
closeCart.addEventListener('click',function(){
    cart.classList.remove('cart-active');
})

// cart working js

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

function ready(){
    // remove item from cart
    var removeCartButton=document.getElementsByClassName('cart-remove')
    console.log(removeCartButton)
    for(let i=0; i<removeCartButton.length;i++){
        let button=removeCartButton[i]
        button.addEventListener('click',removeCartItem)
    }
    let quantityInputs=document.getElementsByClassName('cart-quantity');
    for(let i=0;i<quantityInputs.length;i++){
        let input=quantityInputs[i]
        input.addEventListener("change",quantityChange);
    }
    // add to cart
    let addCart=document.getElementsByClassName('add-cart')
    for(let i=0;i<addCart.length;i++){
        let add=addCart[i]
        add.addEventListener('click',addCartClicked)

    }
    // buy button work
 document.getElementsByClassName('btn-buy')[0]
.addEventListener('click', buyButtonClicked);
}
function buyButtonClicked(){
    alert('you order is placed');
    let cartContent =document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}


// remove items from cart

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateTotal();
}
function quantityChange(event){
    let input=event.target
    if(isNaN(input.value) || input.value <=0){
        input.value=1;
    }
    updateTotal();
}
//add to the cart
function addCartClicked(event){
    let addc=event.target
    let shopProduct= addc.parentElement;
    let title=shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price=shopProduct.getElementsByClassName('price')[0].innerText;
    let productImg= shopProduct.getElementsByClassName('product-img')[0].src;
    addProductCart(title,price,productImg);
    updateTotal();

}
// add product cart
function addProductCart(title,price,productImg){
    let cartShopBox= document.createElement('div');
    cartShopBox.classList.add('cart-box')
    let cartItems=document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i=0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
        alert("you have already add this item to cart");
        return;    
       }
     }
    
let cartBoxContent=`
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart -->
        <i class='bx bxs-trash cart-remove'></i>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChange);
}


// update total

function updateTotal(){
    let cartContent= document.getElementsByClassName('cart-content')[0];
    let cartBoxes=cartContent.getElementsByClassName('cart-box');
    let total=0;
    for(let i=0;i<cartBoxes.length;i++){
        let cartBox=cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement =cartBox.getElementsByClassName('cart-quantity')[0];
        let price =parseFloat(priceElement.innerText.replace('$',''));
        let quantity= quantityElement.value;
        total=total+(price*quantity);
        total=Math.round(total *100)/100;


        document.getElementsByClassName('total-price')[0].innerText="$"+total;
    }
}

