if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
//REMOVING ELEMENTS IN A CART
function ready(){
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for(var i=0 ; i<removeCartItemButtons.length;i++){
    var button= removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem)
     }

     //CREATING A QUANTITY TO CONTROL THE PRICE INPUT
     var quantityInputs = document.getElementsByClassName('cart-quantity-input');
     for(var i=0 ; i<quantityInputs.length;i++){
         var input =quantityInputs[i];
         input.addEventListener('change',quanityChanged)
     }

     var addToCartButtons=document.getElementsByClassName('shop-item-button');
     for (var i=0; i<addToCartButtons.length;i++){
         var button= addToCartButtons[i]
         button.addEventListener('click',addToCartClicked)
     }
     
     document.getElementsByClassName('btn-purchase')[0].addEventListener('cick',purchasedClicked)
}


//ACTIVATING THE CHECKOUT BUTTON
function purchasedClicked(){
    alert('Thank You for your purchase');
    var cartItems=document.getElementsByClassName('cart-item')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}


//FUNCTION TO REMOVE CART ITEM
 function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
 }

 //FUNCTION TO CHANGE QUANTITIES OF ITEMS IN CART
 function quanityChanged(event){
     var input= event.target;
     if(isNaN(input.value)||input.value<=0){
         input.value=1;
     }
      updateCartTotal();
 }

 //FUNCTION TO ADD ITEMS TO CART

 function addToCartClicked(event){
     var button=event.target;
     var shopItem=button.parentElement.parentElement;
     var title= shopItem.getElementsByClassName('shop-item-title')[0].innerText;
     var price= shopItem.getElementsByClassName('shop-item-price')[0].innerText;
     var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src;
     console.log(title,price,imageSrc);
     addItemToCart(title,price,imageSrc);
     updateCartTotal();
 }

 // ADD ITEMS TO CART
 function addItemToCart(title,price,imageSrc){
      var cartRow=document.createElement('div')
      cartRow.classList.add('cart-row');
      var cartItems= document.getElementsByClassName('cart-items')[0]
      var cartItemNames= cartItems.getElementsByClassName('cart-item-title');
      for(var i=0;i<cartItemNames.length;i++){
          if(cartItemNames[i].innerText==title){
              alert('This item has already been added to the list')
              return;
          }
      }
      var cartRowContents = `
      <div class="cart-item cart-column">
                        <img class="cart-item-image" src=" ${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title} </span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="2">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
      cartRow.innerHTML=cartRowContents;
      cartItems.append(cartRow);
      cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
      cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quanityChanged);
 }

//TO CALCULATE THE TOTAL PRICE OF ITEMS IN THE CART
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total=0;
    for (var i=0; i<cartRows.length;i++){
        var cartRow=cartRows[i];
        var priceElement= cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement= cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('GHS',''));
        var quantity= quantityElement.value;
        total+=(price*quantity);
        total =Math.round(total*100)/100;
    }
    document.getElementsByClassName('cart-total-price')[0].innerText= 'GHS'+ total;
}