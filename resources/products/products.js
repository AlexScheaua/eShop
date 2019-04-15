function drawProducts(){
  let productsContainer = document.querySelector("#productsContent");
  productsContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product) && itemList[product].existsInSearch !== "no"){
      productsContainer.innerHTML += `
      <div class="products-item col-xs-4 col-sm-3 col-md-2 d-flex flex-column justify-between">
          <div class="products-item-img">
            <img src="${itemList[product].icon}" onclick="drawDetails('${product}')" class="col-xs-10" alt="">
          </div>
          <div class="products-item-name d-flex justify-center">
            <p class="products-item-name-text col-xs-11" onclick="drawDetails('${product}')">${itemList[product].name}</p>
          </div>
          <div class="products-item-price d-flex flex-column align-center"></div>
          <div class="d-flex justify-around">
            <button class="details-buttons" onclick="drawDetails('${product}')">Details</button>
            <button class="product-to-cart-button d-flex" onclick="addToCart('${product}')"><svg class="add-to-cart" viewBox="0 -31 512.00026 512" xmlns="http://www.w3.org/2000/svg"><path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/><path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/><path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
            </svg></button>
          </div>
      </div>
      `

      let discount = parseInt(itemList[product].discount)
      let productsPrice = document.querySelectorAll(".products-item-price");
      if(discount > 0){
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text-old">Price: ${itemList[product].price.toLocaleString('de-DE')}</p>
          <p class="products-item-price-text products-item-price-text-new">${itemList[product].discountedPrice.toLocaleString('de-DE')} RON</p>
        `
      } else {
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text">${itemList[product].price.toLocaleString('de-DE')} RON</p>
          `
      }
    }
    existsInCart(product, "products");
    if(itemList[product].stock == 0){
      let lastItem = document.querySelectorAll(".products-item");
      lastItem[lastItem.length-1].innerHTML += `
        <p class="out-of-stock d-flex justify-center align-center">Out of Stock</p>
      `
    }
  }
  setLoadingGif(false);
}

  function sort(dataType,direction){
    if(!direction){
      return;
    }

    let productNameList = [].slice.call(document.querySelectorAll(".products-item-name"));
    let productPriceList = [].slice.call(document.querySelectorAll(".products-item-price-text"));
    let pageContent;
    if(document.querySelector("#admin-content")){
      pageContent = document.querySelector("#admin-content");
    } else if (document.querySelector("#productsContent")){
      pageContent = document.querySelector("#productsContent");
    }
    let sorted;
    if(dataType === "name"){
      if(direction === "ascending") {
        sorted = productNameList.sort( (a, b) => (a.innerText > b.innerText) ? 1 : -1 );
      } else if(direction === "descending"){
        sorted = productNameList.sort( (a, b) => (a.innerText < b.innerText) ? 1 : -1 );
      }

      for(let i = 0, l = sorted.length; i < l; i++) {
          pageContent.appendChild(sorted[i].parentElement);
      }
      document.querySelectorAll("#priceSortSelect")[0][0].setAttribute("selected","selected");
    } else if(dataType === "price"){
      if(direction === "descending") {
        sorted = productPriceList.sort( function(a, b){
          a = a.innerText.split(".");
          a = a.join("");
          b = b.innerText.split(".");
          b = b.join("");
          return parseInt(b) - parseInt(a);
        })
      } else if(direction === "ascending"){
        sorted = productPriceList.sort( function(a, b){
          a = a.innerText.split(".");
          a = a.join("");
          b = b.innerText.split(".");
          b = b.join("");
          return parseInt(a) - parseInt(b);
        })
      }

      for(let i = 0, l = sorted.length; i < l; i++) {
          pageContent.appendChild(sorted[i].parentElement.parentElement);
      }
      document.querySelectorAll("#nameSortSelect")[0][0].setAttribute("selected","selected");
    }
  }
