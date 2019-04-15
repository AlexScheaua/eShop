function drawAdmin(){
  let adminContainer = document.querySelector("#admin-content");
  adminContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product) && itemList[product].existsInSearch !== "no"){
      adminContainer.innerHTML += `
      <div class="products-item col-xs-4 col-sm-3 col-md-2 d-flex flex-column justify-between">
          <div class="products-item-img">
            <img src="${itemList[product].icon}" onclick="drawDetails('${product}')" class="col-xs-10" alt="">
          </div>
          <div class="products-item-name d-flex justify-center">
            <p class="products-item-name-text col-xs-11" onclick="drawDetails('${product}')">${itemList[product].name}</p>
          </div>
          <div class="products-item-price d-flex flex-column align-center"></div>
          <div class="d-flex justify-around">
            <button class="admin-buttons edit" onclick="addEditProduct('${product}')">Edit</button>
            <button class="admin-buttons delete" onclick="deleteProduct('${product}')">Delete</button>
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
      if(itemList[product].stock == 0){
        let lastItem = document.querySelectorAll(".products-item");
        lastItem[lastItem.length-1].innerHTML += `
          <p class="out-of-stock d-flex justify-center align-center">Out of Stock</p>
        `
      }
    }
  }
  setLoadingGif(false);
}

function drawEditAdd(idx){
  let detailsBackground = document.querySelector("#product-details-background");
  detailsBackground.style.display = "flex";

  let detailsContent = document.querySelector("#product-details-content");
  if(!idx){
    detailsContent.innerHTML = `
    <div class="add-edit-form d-flex flex-column align-center">
      <span>Name:</span><input type="text" id="input-name">
      <span>Description:</span><textarea id="input-description" rows="8" cols="80"></textarea>
      <span>Icon image:</span><input type="text" id="input-img-princ">
      <span>Slider images(separated by \",\" and new line / enter):</span><textarea id="input-imgs" rows="8" cols="80"></textarea>
      <span>Price:</span><input type="text" id="input-price">
      <span>Discount (0 - 100)(%):</span><input type="text" id="input-discount"/>
      <span>Stock:</span><input type="text" id="input-stock">
      <button type="button" id="saveData" onclick="saveProductFirebase();" name="button">Save</button>
    </div>
    `
  } else {
    let itemImages = itemList[idx].imgs.join(",\n");
    if(!itemList[idx].discount){
      itemList[idx].discount = 0;
    }
    detailsContent.innerHTML = `
    <div class="add-edit-form d-flex flex-column align-center">
      <span>Name:</span><input type="text" id="input-name" value='${itemList[idx].name}'>
      <span>Description:</span><textarea id="input-description" rows="8" cols="80">${itemList[idx].description}</textarea>
      <span>Icon image:</span><input type="text" id="input-img-princ" value="${itemList[idx].icon}">
      <span>Slider images(separated by \",\" and new line / enter):</span><textarea id="input-imgs" rows="8" cols="80">${itemImages}</textarea>
      <span>Price:</span><input type="text" id="input-price" value="${itemList[idx].price}">
      <span>Discount (0 - 100)(%):</span><input type="text" id="input-discount" value="${itemList[idx].discount}"/>
      <span>Stock:</span><input type="text" id="input-stock" value="${itemList[idx].stock}">
      <button type="button" id="saveData" onclick="saveProductFirebase('${idx}');" name="button">Save</button>
    </div>
    `
  }

}

function addEditProduct(idx){
  if(idx){
    drawEditAdd(idx);
  } else {
    drawEditAdd();
  }
}

async function deleteProduct(idx){
  if(confirm("Are you sure you want to delete?")){
    let deletedItem = itemList[idx].name;
    alertMessage(`${deletedItem} was deleted from the database!`)
    await ajax("DELETE","",`products/${itemList[idx]._id}`);
    ajax('GET','','products', drawAdmin);
  }
}

async function saveProductFirebase(idx){
  let saveButton = document.querySelector(".add-edit-form>button");
  saveButton.onclick = "";
  saveButton.innerText = "Saving...";

  let name = document.querySelector("#input-name");
  let description = document.querySelector("#input-description");
  let imgPrinc = document.querySelector("#input-img-princ");
  let imgs = document.querySelector("#input-imgs").value.split(",\n");
  let price = document.querySelector("#input-price");
  let discount = parseInt(document.querySelector("#input-discount").value);
  let discountedPrice = price.value - price.value*(discount/100);
  let stock = document.querySelector("#input-stock")

  let newObj = {
    name: name.value,
    description: description.value,
    icon: imgPrinc.value,
    imgs: imgs,
    price: parseInt(price.value),
    discount: parseInt(discount),
    discountedPrice: parseInt(discountedPrice),
    stock: parseInt(stock.value)
  }
  //verific daca am modificat ceva pe edit pentru a nu face request pe server daca nu e nevoie
  if(idx){
    if(newObj.name === itemList[idx].name && newObj.description === itemList[idx].description && newObj.icon === itemList[idx].icon &&  newObj.price == itemList[idx].price && newObj.discount === itemList[idx].discount && newObj.stock == itemList[idx].stock) {
      let bool = true;
      for(let i = 0; i < newObj.imgs.length; i++){
        if(newObj.imgs[i] !== itemList[idx].imgs[i]){
          bool = true;
          break;
        } else {
          bool = false
        }
      }
      if(!bool) {
        hideDetails();
        return console.log("no ajax!");
      }
      hideDetails();
    }
  }

  if(newObj.name !== "" && newObj.description !== "" && newObj.icon !== "" &&  !(isNaN(newObj.price)) && !(isNaN(newObj.discount)) && newObj.discount < 100 && newObj.discount >= 0 && !(isNaN(newObj.stock))){
    if(!idx){
      await ajax("POST",JSON.stringify(newObj),"products");
      alertMessage("Product Added!");
    } else {
      await ajax("PUT",JSON.stringify(newObj),`products/${itemList[idx]._id}`);
      alertMessage("Product Saved!");
    }

    ajax('GET','','products', drawAdmin);
    hideDetails();
  } else {
    alertMessage("All the inputs are needed, please check that the price, discount and stock to be numbers")
    saveButton.setAttribute("onclick", `saveProductFirebase('${idx}')`);
    saveButton.innerText = "Save";
  }
}
