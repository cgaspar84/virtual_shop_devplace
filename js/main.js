var myProductList = new Object();
var myProductsSubtotal = 0;
var myProductsAmount = 0;

// Define Cart DB
// product_id
// product_name
// product_price
// product_amount
// product_img

//var localCartDB = localStorage.getItem("myCart");



$(document).ready(function () {
  $("#myPopover").popover({
    title: "Preview Cart",
    content:
      "<div class='row-auto border-bottom p-2'>" +
      getProductList() +
      calculateSubtotal() +
      "<div class='d-flex justify-content-center'><a class='cart-clean btn btn-dark' value='Clean cart' >Clean Cart</a></div>"+
      "</div>",
    html: true
  });  
});

$('#myPopover').on('shown.bs.popover', function () {

  var btns = document.getElementsByClassName("cart-link");
  for (var i=0; i < btns.length; i++) {
      let myID = btns[i].id;
      btns[i].onclick = function() { 
        var idToRemove =   $(this).attr('id');
        removeFromCart(idToRemove.replace("cartRemove_", ""));  
    };
  }

  var btnClean = document.getElementsByClassName("cart-clean");
  btnClean[0].onclick = function() {
    myCart_clear();
    window.location.reload();
  };

});

function addToCart(id, nameProduct, priceProduct, imgProduct) {
  
  Swal.fire({
    title: "Confirm purchase",
    text: "Confirm purchase of product to cart?",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No. Continue shopping"
  }).then((result) => {
    if (result.isConfirmed) {
      myCart_saveItem(id, nameProduct, priceProduct, imgProduct);
      window.location.reload();
      $wal.fire("Item was aded to your cart!", "", "success");
    }
  });

}

function removeFromCart(iProductId) {
  
  Swal.fire({
    title: "Confirm delete",
    text: "Are you sure you want to remove this product?",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No"
  }).then((result) => {
    if (result.isConfirmed) {
      myCart_deleteItem(iProductId);
      window.location.reload();
      //$wal.fire("Item Removed", "", "success");
    }
  });

}

function calculateSubtotal() {
  return (
    "<div class='d-flex justify-content-between'><h3 class='fs-6 fw-bold'>SUBTOTAL</h3><div class='mb-1 cash-value'> $ " +
    myProductsSubtotal +
    "</div></div>"
  );
}

function loadProductList() {
  fetch("http://127.0.0.1:5500/products.json")
    .then((response) => response.json())
    .then((data) => {
      
      let list_products = data.catalog_products;
      let mainProductContainer = document.getElementById("product_catalog");
      for (let i in list_products) {
        console.log(i+ " " + list_products[i].name);

        mainProductContainer.insertBefore(buildProductCatalogDetail(list_products[i]), document.getElementById("pagination"));
      }

    })
    .catch((error) => console.log("[ ERROR ] " + error));
}

/*
          <div class="row flex-md-row mb-4 mt-2">
            <div class="col-auto m-sm-auto">
              <img class="flex-shrink-0 me-3 ms-0" src="img/shop-stock-1.png" alt="..." />
            </div>
            <div class="w-100 d-sm-block d-md-block d-lg-none"></div>
            <div class="col p-4 d-flex flex-column">
              <h5 class="card-title fw-bold mb-0">Product A</h5>
              <div class="mb-1 cash-value">$250.00</div>
              <div class="mb-2">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>
              <p class="card-text mb-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                orci enim, blandit eget elit cursus, aliquet luctus orci. Duis
                molestie vulputate lectus, sed rhoncus eros cursus sed. Duis
                ac lectus eget massa viverra varius eu.
              </p>
              <p class="card-text my-3 mb-3 text-secondary">
                Shoes, T-Shirt, Teen
              </p>
              <div class="mb-1">
                <a href="#" class="btn btn-primary" id="addToCart"
                  onclick="addToCart(1, 'Product A','250', 'img/shop-stock-1.png')"><i
                    class="fa-solid fa-cart-plus"></i> Add to Cart</a>
                <a href="#" class="btn btn-outline-secondary" onclick="getProductList()"><i
                    class="fa-regular fa-heart text-dark"></i></a>
                <a href="#" class="btn btn-outline-secondary"><i class="fa-solid fa-share"></i></a>
              </div>
            </div>
          </div>
 */

function buildProductCatalogDetail(product) {
  // Build main div
  let productMain = document.createElement("div");
  productMain.className = 'row flex-md-row mb-4 mt-2';
  // ** START Product Img detail
  let productImgContainer = document.createElement("div");
  productImgContainer.className = 'col-auto m-sm-auto';

  let productImg = document.createElement("img");
  productImg.className = 'flex-shrink-0 me-3 ms-0';
  productImg.src = product.img;

  productImgContainer.appendChild(productImg);
  // ** END Product Img Detail

  let productSeparator = document.createElement("div");
  productSeparator.className = 'w-100 d-sm-block d-md-block d-lg-none';

  // ** START Product Detail
  let productDetailContainer = document.createElement("div");
  productDetailContainer.className = 'col p-4 d-flex flex-column';

  let productDetailName = document.createElement("h5");
  productDetailName.className = 'card-title fw-bold mb-0';
  productDetailName.innerHTML = product.name;
  let productDetailPrice = document.createElement("div");
  productDetailPrice.className = 'mb-1 cash-value';
  productDetailPrice.innerHTML = '$ ' + product.price;
  let productRating = document.createElement("div");
  productRating.className = 'mb-2';
  for (let i = 1; i <= product.rating; i++) {
    let productRatingStar = document.createElement("span");
    productRatingStar.className = 'fa fa-star checked';
    productRating.appendChild(productRatingStar);
  }
  //TODO Complete Rating

  let productDetailDescription = document.createElement("p");
  productDetailDescription.className = 'card-text mb-auto';
  productDetailDescription.innerText = product.description;
  let productDetailTags = document.createElement("p");
  productDetailTags.className = 'card-text my-3 mb-3 text-secondary';
  //TODO Load from JSON !!
  productDetailTags.innerText = 'Shoes, T-Shirt, Teen';

  let productDetailActionsDiv = document.createElement("div");
  productDetailActionsDiv.className = 'mb-1 d-flex gap-1';
  // **** START Product Actions
  let productActionAdd = document.createElement("a");
  productActionAdd.className = 'btn btn-primary';
  productActionAdd.text = ' Add to Cart';
  productActionAdd.href = '#';
  let params = product.id + ",'" + product.name + "','" + product.price + "','" + product.img + "'";
  productActionAdd.setAttribute("onclick", 'addToCart('+params+')');
  let productActionAddIcon = document.createElement("i");
  productActionAddIcon.className = 'fa-solid fa-cart-plus';
  productActionAdd.prepend(productActionAddIcon);

  let productActionFav = document.createElement("a");
  productActionFav.className = 'btn btn-outline-secondary';
  productActionFav.href = '#';
  let productActionFavIcon = document.createElement("i");
  productActionFavIcon.className = 'fa-regular fa-heart text-dark';
  productActionFav.appendChild(productActionFavIcon);

  let productActionShare = document.createElement("a");
  productActionShare.className = 'btn btn-outline-secondary';
  productActionShare.href = '#';
  let productActionShareIcon = document.createElement("i");
  productActionShareIcon.className = 'fa-solid fa-share';
  productActionShare.appendChild(productActionShareIcon);
  // **** END Product Actions
  productDetailActionsDiv.appendChild(productActionAdd);
  productDetailActionsDiv.appendChild(productActionFav);
  productDetailActionsDiv.appendChild(productActionShare);

  productDetailContainer.appendChild(productDetailName);
  productDetailContainer.appendChild(productDetailPrice);
  productDetailContainer.appendChild(productRating);
  productDetailContainer.appendChild(productDetailDescription);
  productDetailContainer.appendChild(productDetailTags);
  productDetailContainer.appendChild(productDetailActionsDiv);
  // ** END Product Detail 

  productMain.appendChild(productImgContainer);
  productMain.appendChild(productSeparator);
  productMain.appendChild(productDetailContainer);

  return productMain;
}

/*
  <div class="row flex-row mb-1 border-bottom">
                  <div class="col-auto d-flex flex-wrap align-items-center "><img class="flex-shrink-0 me-0 ms-0" width="50px" src="img/banner-shop-1.png" alt="..."/></div>
                  <div class="col p-1 d-flex flex-column">
                    <h3 class="mb-1 fs-6 fw-bold">iProductName</h3>
                    <div class="mb-1 cash-value">$ 100 </div>
                    <div class="mb-1 ">Quantity: 1 </div>
                  </div>
                  <div class="col d-flex align-items-center">
                      
                      <a class="text-dark" href="#" onclick="removeFromCart(1)">
                      <i class="fa-solid fa-trash-can"></i></a>
                    
                  </div>
                </div>
 */

function buildProductDetail(iProductID, iProductName, iProductImg, iProductPrice, iProductQuantity) {
  let itemCart = document.createElement("div");
  itemCart.className = 'row flex-row mb-1 border-bottom';
  
  let productImgDiv = document.createElement("div");
  productImgDiv.className = 'col-auto d-flex flex-wrap align-items-center';
  let productImg = document.createElement("img");
  productImg.className = 'flex-shrink-0 ms-0';
  productImg.src = iProductImg;
  productImg.setAttribute('width', '50px');

  let productDetailDiv = document.createElement("div");
  productDetailDiv.className = 'col-auto p-1 d-flex flex-column';

  let productDetailName = document.createElement("h3");
  productDetailName.className = 'mb-1 fs-6 fw-bold';
  productDetailName.innerHTML = iProductName;
  let productDetailPrice = document.createElement("div");
  productDetailPrice.className = 'mb-1 cash-value';
  productDetailPrice.innerHTML = '$ ' + iProductPrice +' ';
  let productDetailQuantity = document.createElement("div");
  productDetailQuantity.className = 'mb-1';
  productDetailQuantity.innerHTML = 'Quantity: ' + iProductQuantity;

  // Delete item element
  let productDeleteBtnDiv = document.createElement("div");
  productDeleteBtnDiv.className = 'col-auto d-flex align-items-center';  
  
  var productDeleteBtn = document.createElement("a");
  productDeleteBtn.className = 'cart-link text-dark'; 
  productDeleteBtn.setAttribute("id", "cartRemove_" + iProductID);
  

  productDeleteBtn.setAttribute('onclick', 'removeFromCart(1)');
  let productDeleteIcon = document.createElement("i");
  productDeleteIcon.className = 'fa-solid fa-trash-can';

  productImgDiv.appendChild(productImg);
  productDetailDiv.appendChild(productDetailName);
  productDetailDiv.appendChild(productDetailPrice);
  productDetailDiv.appendChild(productDetailQuantity);

  productDeleteBtn.appendChild(productDeleteIcon);
  productDeleteBtnDiv.appendChild(productDeleteBtn);

  itemCart.appendChild(productImgDiv);
  itemCart.appendChild(productDetailDiv);
  itemCart.appendChild(productDeleteBtnDiv);

  //TODO calculate from DB
  myProductsSubtotal += (iProductPrice * iProductQuantity);

  return itemCart;
}

function getProductList() {
  var localCartDB = localStorage.getItem("myCart");
  localCartDB = JSON.parse(localCartDB);
  var items = '';
  var myProductsAmount = 0;

  if (localCartDB !== null) {

  localCartDB.forEach(element => {
    
    var currentItem = buildProductDetail(element.id, element.name, element.imgFile, element.price, element.quantity);
    items += currentItem.outerHTML;
    myProductsAmount++;    
  });
}

  let cartElementAmount = document.getElementById("cartCurrent");

  cartElementAmount.innerHTML = myProductsAmount;

  return items;
}


//* LOCAL CART FUNCTIONS */
function myCart_saveItem(iProductID, iProductName, iProductPrice, iProductImg) {
    var localCartDB = localStorage.getItem("myCart");
    
    let id = iProductID;
    let name = iProductName;
    let price = iProductPrice;
    let quantity = 1;
    let imgFile = iProductImg;    

    if (localCartDB === null) {
      // Empty Cart
      let data = [{ id, name, price, quantity, imgFile}];
      localStorage.setItem("myCart", JSON.stringify(data));
    } else {
      localCartDB = JSON.parse(localCartDB);
      var counts = localCartDB.find((element) => element.id === iProductID);
      var index = localCartDB.findIndex((element) => element.id === iProductID);

      if (counts === undefined) {
        // New Product Add
        localCartDB.push({id, name, price, quantity, imgFile});
        localStorage.setItem("myCart", JSON.stringify(localCartDB));
      } else {
        // Modify Product
        quantity = localCartDB[index].quantity + 1;
        localCartDB.splice(index, 1);
        localCartDB.push({id, name, price, quantity, imgFile});
        localStorage.setItem("myCart", JSON.stringify(localCartDB));
      }

    }
}

function myCart_deleteItem(iProductId) {
  console.log("Remove product: [" + iProductId+"]");
  var localCartDB = localStorage.getItem("myCart");

  localCartDB = JSON.parse(localCartDB);
  console.log(localCartDB);
  var counts = localCartDB.find((element) => element.id === parseInt(iProductId,10));
  var index = localCartDB.findIndex((element) => element.id === parseInt(iProductId,10));

  console.log("counts "+ counts) ;
  console.log("index " +index);
  if (counts === undefined) {
    console.log("ERROR: Product not found !!");
  } else {
    localCartDB.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(localCartDB));
  }
}

function myCart_clear() {
  localStorage.removeItem("myCart");
  //localStorage.setItem("myCart", "{}");
}

function myCart_calculateSubTotal() {
  
}