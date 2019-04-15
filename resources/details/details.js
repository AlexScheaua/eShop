async function drawDetails(idx,page){
  let detailsBackground = document.querySelector("#product-details-background");
  detailsBackground.style.display = "flex";

  let detailsContent = document.querySelector("#product-details-content");
  detailsContent.innerHTML = `
    <div id="product-details-slider" class="col-xs-9 col-md-6">

    </div>
    <div id="product-details-info" class="d-flex flex-column justify-between col-xs-12 col-md-6">

    </div>
  `;

  if(page === "cart"){
    let detailsSlider = document.querySelector("#product-details-slider");
    detailsSlider.innerHTML = "";
    for (let i = 0; i < productsInCart[idx].imgs.length; i++){
      if(productsInCart[idx].imgs[i]){
        detailsSlider.innerHTML += `
        <div class="details-carousel-cell col-xs-12">
          <img src="${productsInCart[idx].imgs[i]}" alt="" />
        </div>
        `
      }
    }

    let detailsInfo = document.querySelector("#product-details-info");
    detailsInfo.innerHTML = `
      <h2 class="details-title">${productsInCart[idx].name}</h2>
      <div class="details-item-price-stock d-flex justify-around align-center flex-wrap">
        <p class="details-item-price col-xs-6 col-sm-4">Price: ${productsInCart[idx].price.toLocaleString('de-DE')} RON</p>
        <p class="details-item-stock col-xs-6 col-sm-4">Stock: <span id="details-stock"></span></p>
        <button class="add-to-cart-button d-flex" onclick="addToCart('${idx}')"><svg class="add-to-cart" viewBox="0 -31 512.00026 512" xmlns="http://www.w3.org/2000/svg"><path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/><path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/><path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
        </svg><span>Add to Cart</span></button>
      </div>
      <div>
        <p class="details-description-title">Description:</p>
        <p class="details-description-text">${descriptionTextToHTML(productsInCart[idx].description)}</p>
      </div>
    `
    document.querySelector("#details-stock").innerHTML = productsInCart[idx].stock;
  } else {
    let detailsSlider = document.querySelector("#product-details-slider");
    detailsSlider.innerHTML = "";
    for (let i = 0; i < itemList[idx].imgs.length; i++){
      if(itemList[idx].imgs[i]){
        detailsSlider.innerHTML += `
        <div class="details-carousel-cell col-xs-12">
          <img src="${itemList[idx].imgs[i]}" alt="" />
        </div>
        `
      }
    }

    let detailsInfo = document.querySelector("#product-details-info");
    detailsInfo.innerHTML = `
      <h2 class="details-title">${itemList[idx].name}</h2>
      <div class="details-item-price-stock d-flex justify-around align-center flex-wrap">
        <p class="details-item-price col-xs-6 col-sm-4">Price: ${itemList[idx].price.toLocaleString('de-DE')} RON</p>
        <p class="details-item-stock col-xs-6 col-sm-4">Stock: <span id="details-stock"></span></p>
        <button class="add-to-cart-button d-flex" onclick="addToCart('${idx}')"><svg class="add-to-cart" viewBox="0 -31 512.00026 512" xmlns="http://www.w3.org/2000/svg"><path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/><path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/><path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
        </svg><span>Add to Cart</span></button>
      </div>
      <div>
        <p class="details-description-title">Description:</p>
        <p class="details-description-text">${descriptionTextToHTML(itemList[idx].description)}</p>
      </div>
    `
    document.querySelector("#details-stock").innerHTML = itemList[idx].stock;
  }
  existsInCart(idx, "details");

  carouselForDetails();
}

function addToCartToAlreadyInCart(button){
  if(button.innerText === "Add to Cart"){
    let addToCartButton = document.querySelector(".add-to-cart-button");
    addToCartButton.innerText = "Already in cart";
    addToCartButton.setAttribute("onClick", "");
    addToCartButton.style.backgroundColor ="#ffae32";
    let stockDisplay = document.querySelector(".details-item-stock>span");
    stockDisplay.innerText = parseInt(stockDisplay.innerText) - 1;
    autoRedrawComponent();
  } else {
   button.setAttribute("onClick", "");
   button.style.backgroundColor ="#ffae32";
 }
}

function autoRedrawComponent(){
  if(document.querySelector("#homePage")){
    drawHome();
  } else if (document.querySelector("#productsPage")){
    drawProducts();
  }
}

let detailsContainer = document.querySelector("#product-details-container");
detailsContainer.addEventListener("click", function(){ //opreste bubblingul de pe detailsContainer care inchide pagina
  event.stopPropagation();
})


window.addEventListener("keyup", function(event){ //opreste bubblingul de pe detailsContainer care inchide pagina
  let detailsBackground = document.querySelector("#product-details-background");
  if(event.keyCode == 27 && detailsBackground.style.display != "none"){
    hideDetails();
  }
})

function hideDetails(){
  let detailsBackground = document.querySelector("#product-details-background");
  detailsBackground.style.display = "none"
}

function descriptionTextToHTML(description){
  description = description.split("\n");
  description = description.join("<br>");
  return description;
}
