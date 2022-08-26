var myProductList = new Object();
var myProductsSubtotal = 0;
var myProductsAmount = 0;

$(document).ready(function () {
  $("#myPopover").popover({
    title: "Preview Cart",
    content:
      "<div class='row border-bottom p-2'>" +
      getProductList() +
      calculateSubtotal() +
      "</div>",
    html: true
  });
});

/*<div class='row border-bottom p-4'><div class='row mt-3 mb-2'>
      <h3 class='fs-6 fw-bold'>MY CART</h3>
    </div>

    <div class="row flex-row mb-4 border-bottom"><div class="col-auto d-none d-sm-block"><img class="flex-shrink-0 me-0 ms-0" src="https://picsum.photos/50/90" alt="..."/></div><div class="col p-4 d-flex flex-column"><h3 class="mb-4 fs-6 fw-bold">Product X</h3><div class="mb-1 cash-value">$250.00</div></div></div><div class="row mt-3 mb-2"><h3 class="fs-6 fw-bold">SUBTOTAL</h3></div><div class="row mt-3 mb-2"><button class="btn btn-primary">View my Cart</button></div></div>*/

function addToCart(id, nameProduct, priceProduct, imgProduct) {
  myProductList.id = id;
  myProductList.nameProduct = nameProduct;
  myProductList.priceProduct = priceProduct;
  myProductList.imgProduct = imgProduct;

  Swal.fire({
    title: "Confirm purchase",
    text: "Confirm purchase of product to cart?",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No. Continue shopping"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("product_" + id, JSON.stringify(myProductList));
      window.location.reload();
      $wal.fire("Item was aded to your cart!", "", "success");
    }
  });

  //let elementCounter = document.getElementById("cartCurrentAmount").value;

  //var intResult = parseInt(
  //  document.getElementById("cartCurrentAmount").value,
  //  10
  //);

  //intResult = intResult + 1;
  //alert(intResult);

  //let elementCounterLbl = document.getElementById("cartCurrent");

  //elementCounterLbl.innerHTML = intResult;
  //elementCounter.value = intResult;
}

function calculateSubtotal() {
  return (
    "<div class='d-flex justify-content-between'><h3 class='fs-6 fw-bold'>SUBTOTAL</h3><div class='mb-1 cash-value'> $ " +
    myProductsSubtotal +
    "</div></div>"
  );
}

function buildProductDetail(iProductName, iProductImg, iProductPrice) {
  var productLineDetail = "";
  // Add Product Main div
  productLineDetail += '<div class="row flex-row mb-1 border-bottom">';
  // Add Product Img
  productLineDetail +=
    '<div class="col-auto d-block"><img class="flex-shrink-0 me-0 ms-0" width="50px" src=' +
    iProductImg +
    " " +
    'alt="..."/></div>';
  // Add Product Title
  productLineDetail +=
    '<div class="col p-1 d-flex flex-column"><h3 class="mb-1 fs-6 fw-bold">' +
    iProductName +
    "</h3>";
  // Add Product Price
  productLineDetail +=
    '<div class="mb-1 cash-value">$ ' + iProductPrice + "</div>";

  productLineDetail += "</div></div>";
  return productLineDetail;
}

function getProductList() {
  var productAux = JSON.parse(window.localStorage.getItem("product_1"));
  var productLine = "";
  myProductsAmount = 0;

  if (productAux != undefined) {
    console.log("Found product 1!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  productAux = JSON.parse(window.localStorage.getItem("product_2"));

  if (productAux != undefined) {
    console.log("Found product 2!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  productAux = JSON.parse(window.localStorage.getItem("product_3"));

  if (productAux != undefined) {
    console.log("Found product 3!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  productAux = JSON.parse(window.localStorage.getItem("product_4"));

  if (productAux != undefined) {
    console.log("Found product 4!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  productAux = JSON.parse(window.localStorage.getItem("product_5"));

  if (productAux != undefined) {
    console.log("Found product 5!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  productAux = JSON.parse(window.localStorage.getItem("product_6"));

  if (productAux != undefined) {
    console.log("Found product 6!");
    productLine += buildProductDetail(
      productAux.nameProduct,
      productAux.imgProduct,
      productAux.priceProduct
    );
    console.log(productLine);
    myProductsSubtotal += parseInt(productAux.priceProduct, 10);
    myProductsAmount++;
  }

  let cartElementAmount = document.getElementById("cartCurrent");

  cartElementAmount.innerHTML = myProductsAmount;

  console.log("myAmount " + myProductsAmount);
  return productLine;
}
