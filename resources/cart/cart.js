async function drawCart(){
  productsInCart = [];
  for(let item in cartList){
    if(cartList.hasOwnProperty(item)){
      await ajax("GET","",`products/${cartList[item].product}`);
    }
  }

  let totalPrice = 0;

  let cartItemsList = document.querySelector(".cart-items-list");
  cartItemsList.innerHTML = "";

  if(cartList === null){
    cartItemsList.innerHTML = `
      <div class="d-flex justify-center align-center">
        <p>There are no items in the cart</p>
      </div>
    `
  }

  for(let product in cartList){
    cartItemsList.innerHTML += `
      <li class="cart-items-list-item d-flex justify-between align-center">
        <img class="cart-items-list-images" onclick="drawDetails('${product}','cart')" src="${productsInCart[product].icon}" alt="${productsInCart[product].name}" />
        <p class="cart-items-list-name" onclick="drawDetails('${product}','cart')">${productsInCart[product].name}</p>
        <select name="" id="" class="cart-items-list-stock" onchange="modifyStock('${product}')"></select>
        <button class="cart-items-list-button" onclick="modifyStock('${product}','remove')"><i class="fas fa-backspace"></i></button>
        <p class="cart-items-list-price">${(productsInCart[product].discountedPrice*cartList[product].quantity).toLocaleString('de-DE')} RON</p>
      </li>
    `
    let cartItemslistStockSelect = document.querySelectorAll(".cart-items-list-stock")[document.querySelectorAll(".cart-items-list-stock").length-1];
    for(let i = 0; i < productsInCart[product].stock + cartList[product].quantity; i++){
      if(i+1 == cartList[product].quantity){
        cartItemslistStockSelect.innerHTML += `
          <option value="${i+1}" selected="selected">${i+1}</option>
        `
      } else {
        cartItemslistStockSelect.innerHTML += `
          <option value="${i+1}">${i+1}</option>
        `
      }
    }

    totalPrice = totalPrice + (productsInCart[product].discountedPrice*cartList[product].quantity)
  }

  let cartCheckoutContainer = document.querySelector(".cart-checkout-container");
  cartCheckoutContainer.innerHTML = `
      <p>Total:</p>
      <p class="total-price">${totalPrice.toLocaleString('de-DE')} RON</p>
      <button class="checkout-button" onclick="checkout()">Checkout</button>
  `
  setLoadingGif(false);
}

async function modifyStock(idx,remove){
  let productsStock = productsInCart[idx].stock + cartList[idx].quantity;
  if(!remove){
    cartList[idx].quantity = parseInt(event.target.value);
    productsInCart[idx].stock = productsStock - cartList[idx].quantity

    await ajax("PUT",JSON.stringify(cartList[idx]),`cart/${cartList[idx]._id}`);
    await ajax("PUT",JSON.stringify(productsInCart[idx]),`products/${productsInCart[idx]._id}`);
    await ajax('GET','','cart');

    drawCart();
  } else {
    event.target.closest("button").setAttribute("onClick", "");
    alertMessage("Product removed from cart!")
    productsInCart[idx].stock = productsStock;
    productsInCart[idx].inCart = false;

    await ajax("PUT",JSON.stringify(productsInCart[idx]),`products/${productsInCart[idx]._id}`);
    await ajax("DELETE","",`cart/${cartList[idx]._id}`);
    await ajax('GET','','cart');

    drawCart();
  }
}

function getCartItemsForIndicator(){
  let cartIndicator = document.getElementById("cart-indicator");
  cartIndicator.innerText = "";
  for(let products in cartList){
    if(cartIndicator.innerText === ""){
      cartIndicator.innerText = 0;
    }
    cartIndicator.innerText = parseInt(cartIndicator.innerText) + parseInt(cartList[products].quantity);
  }
}

function existsInCart(idx, page){
  if(page === "details"){
    if(itemList[idx].inCart){
      let addToCartButton = document.querySelector(".add-to-cart-button");
      addToCartButton.innerText = "Already in cart";
      addToCartButton.setAttribute("onClick", "");
      addToCartButton.style.backgroundColor ="#ffae32";
      let stockDisplay = document.querySelector(".details-item-stock>span");
    }
  } else if(page === "home"){
    var cartButtons = document.querySelectorAll(".product-to-cart-button");
    if(itemList[idx].inCart && itemList[idx].discount != 0){
      cartButtons[cartButtons.length - 1].setAttribute("onClick", "");
      cartButtons[cartButtons.length - 1].style.backgroundColor ="#ffae32";
    }
  } else if(page === "products"){
    var cartButtons = document.querySelectorAll(".product-to-cart-button");
    if(itemList[idx].inCart){
      cartButtons[cartButtons.length - 1].setAttribute("onClick", "");
      cartButtons[cartButtons.length - 1].style.backgroundColor ="#ffae32";
    }
  }
}

async function addToCart(idx) {
  let button = event.target.closest("button");
  button.disabled = true;

  if(itemList[idx].stock > 0){
    itemList[idx].stock--;
    itemList[idx].inCart = true;
    ajax("PUT",JSON.stringify(itemList[idx]),`products/${itemList[idx]._id}`);
    alertMessage("Product added to cart");
    let cartObject = {
      productId: itemList[idx]._id,
      quantity: 1
    }
    await ajax("POST",JSON.stringify(cartObject),`cart`);

    addToCartToAlreadyInCart(button);

    await ajax("GET",'','cart');
    await ajax("GET",'','products');
  } else {
    alertMessage("This product is not in stock");
    button.disabled = false;
  }
}

async function checkout(){
  alertMessage("The products were bought!")
  for(let product in cartList){
    if(cartList.hasOwnProperty(product)){
      for(let item in itemList){ //setez inCart = false
        if(itemList.hasOwnProperty(item) && itemList[item].inCart == true){
          itemList[item].stock = productsInCart[product].stock;
          itemList[item].inCart = false;
          await ajax("PUT",JSON.stringify(itemList[item]),`products/${itemList[item]._id}`)
        }
      }
      await ajax("DELETE",'',`cart/${cartList[product]._id}`);
    }
  }
  productsInCart = [];
  ajax("GET","","cart",drawCart);
}
