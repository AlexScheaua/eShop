//functii care initializeaza componentele

async function  loadComponent(url) {
    setLoadingGif(true);
    const contentDiv = document.querySelector("#content");
    contentDiv.innerHTML = await fetchHtmlAsText(`${url}`);
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

//functie care initializeaza harta dupa ce pagina este incarcata
function mapIframeLoad(){
  let mapIframe = document.querySelector(".map");
  mapIframe.innerHTML = `<iframe class="map-iframe col-xs-12" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?hl=en&amp;q=1700-1748 Channing Ave,Palo Alto, CA 94303,USA+()&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" <="" iframe=""></iframe>`
}

//functii pentru navbar menu
function dropDownMenuSticky(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  let searchContainer = document.querySelector("#search-container");
  for(let i = 1; i < navbarItems.length; i++){
    if(navbarItems[i].style.display === "list-item"){
      navbarItems[i].style.display = "none";
      searchContainer.style.top = "53px";
    } else {
      navbarItems[i].style.display = "list-item";
      searchContainer.style.top = "204px";
    }
  }
}

function drawSearch(){
  if(document.querySelector("#cart-container")){
    document.querySelector("#search-container").style.display = "none";
  } else {
    document.querySelector("#search-container").style.display = "flex";
  }
}

function alertMessage(message){
  let alertBox = document.querySelector("#alert-box-container");
  alertBox.innerHTML = `
    <div class="alert-box-background d-flex justify-center align-center">
      <div class="alert-box d-flex flex-column justify-center align-center">
        <p class="alert-text">${message}</p>
        <button class="details-buttons" onclick="removeAlertBox()">OK</button>
      </div>
    </div>
  `
}

function removeAlertBox(){
  let alertBox = document.querySelector("#alert-box-container");
  alertBox.innerHTML = "";
}

function cartIndicatorOnMenuOpen(){
  var cartIndicator = document.querySelector("#cart-indicator");
  let searchContainer = document.querySelector("#search-container")
  if(searchContainer.style.top === "204px"){
    cartIndicator.style.top = "87px";
  } else {
    cartIndicator.style.top = "12px";
  }
}

function onResize(){
  let logoIcon = document.querySelector("#logo-icon>img");
  if(window.innerWidth <= 768){
    logoIcon.src = "resources/logo-icon.png";
  } else {
    logoIcon.src = "resources/logo-full.png";
  }
}

function hideMenu(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  let searchContainer = document.querySelector("#search-container");
  if(window.innerWidth <= 768){
    for(let i = 1; i < navbarItems.length; i++){
        navbarItems[i].style.display = "none";
        searchContainer.style.top = "53px";
    }
  }
}

function searchProducts(){
  var searchInput = document.querySelector("#search-input");
  for(product in itemList){
    var existsName = (itemList[product].name).toLowerCase().indexOf((searchInput.value));
    if(existsName === -1){
      itemList[product].existsInSearch = "no"
    } else{
      itemList[product].existsInSearch = "yes"
    }
  }

  if(document.querySelector("#homePage")){
    drawHome();
  } else if(document.querySelector("#productsPage")){
    drawProducts();
  } else if(document.querySelector("#adminPage")){
    drawAdmin();
  }
}

function setLoadingGif(bool){
  let loadingGif = document.querySelector(".loading-gif")
  let content = document.querySelector("#content")

  if(bool){
    loadingGif.style.display = "flex";
    content.style.display = "none";
  } else {
    loadingGif.style.display = "none";
    content.style.display = "flex";
  }
}


let itemList = {};
let cartList = {};
let productsInCart = [];
//ajax request
async function ajax(method,body,idx,drawFunction){
  if(!method){
    method = "GET";
  }

  if(!body){
    body = null;
  }

  if(!idx){
    idx = "";
  }

await fetch(`https://eshop-backend-app.herokuapp.com/${idx}`,{
    method: method,
    body: body,
    headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(response => {
    if(method === "GET" && idx === "products"){
      itemList = response;
    } else if (method === "GET" && idx === "cart"){
      cartList = response;
      getCartItemsForIndicator();
    } else if (method === "GET"){
      productsInCart.push(response);
    }
  })
  .then(() => {
    if(drawFunction){
      drawFunction();
    }
  })
}
