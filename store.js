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

}


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
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity= quantityElement.value;
        total+=(price*quantity);
        total =Math.round(total*100)/100;
    }
    document.getElementsByClassName('cart-total-price')[0].innerText= '$'+ total;
}