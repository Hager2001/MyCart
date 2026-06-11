/**
 * Shared cart utilities
 */

function productQuantityUpdate(isIncrease, productQuantityFieldId) {
  const productQuantityField = document.getElementById(productQuantityFieldId);
  const productPreviusQuantity = parseInt(productQuantityField.value);
  let productCurrentQuantity = productPreviusQuantity;

  if (isIncrease) {
    productCurrentQuantity = productPreviusQuantity + 1;
  } else {
    if (productPreviusQuantity > 1) {
      productCurrentQuantity = productPreviusQuantity - 1;
    }
  }

  return (productQuantityField.value = productCurrentQuantity);
}

function productPriceUpdate(price, quantity, productPriceId) {
  const productTotalPrice = price * quantity;
  document.getElementById(productPriceId).innerText = productTotalPrice;
  updateEverythings();
}

function subtotalPriceUpdate() {
  let subtotalPrice = 0;
  const productsPrice = document.getElementsByClassName("products-price");
  for (const productPrice of productsPrice) {
    subtotalPrice += parseFloat(productPrice.innerText);
  }

  return (document.getElementById("subtotalPrice").innerText = subtotalPrice);
}

function taxOfTotalPriceUpdate() {
  const subtotalPrice = subtotalPriceUpdate();
  const taxPercentage = 10;
  const taxOfTotalPrice = (subtotalPrice * taxPercentage) / 100;
  return (document.getElementById("totalTaxAmount").innerText =
    taxOfTotalPrice);
}

function totalPriceUpdate() {
  return (document.getElementById("totalPrice").innerText =
    subtotalPriceUpdate() + taxOfTotalPriceUpdate());
}

function removeProductById(productId) {
  const removeProductId = document.getElementById(productId);
  removeProductId.parentNode.removeChild(removeProductId);
  updateEverythings();
}

function updateEverythings() {
  subtotalPriceUpdate();
  taxOfTotalPriceUpdate();
  totalPriceUpdate();
}

updateEverythings();

// Data-driven product configuration — add new products here instead of
// duplicating event listener blocks.
var cartProducts = [
  {
    quantityFieldId: "productOneQuantity",
    priceId: "productOnePrice",
    unitPrice: 1250,
    increaseBtn: "productOneQuantityIncrease",
    decreaseBtn: "productOneQuantityDecrease",
    removeBtn: "removeProductOne",
    removeTargetId: "cartItems",
  },
  {
    quantityFieldId: "productTwoQuantity",
    priceId: "productTwoPrice",
    unitPrice: 50,
    increaseBtn: "productTwoQuantityIncrease",
    decreaseBtn: "productTwoQuantityDecrease",
    removeBtn: "removeProductTwo",
    removeTargetId: "productTwo",
  },
];

function bindProductHandlers(product) {
  var increaseEl = document.getElementById(product.increaseBtn);
  if (increaseEl) {
    increaseEl.addEventListener("click", function () {
      var qty = productQuantityUpdate(true, product.quantityFieldId);
      productPriceUpdate(product.unitPrice, qty, product.priceId);
    });
  }

  var decreaseEl = document.getElementById(product.decreaseBtn);
  if (decreaseEl) {
    decreaseEl.addEventListener("click", function () {
      var qty = productQuantityUpdate(false, product.quantityFieldId);
      productPriceUpdate(product.unitPrice, qty, product.priceId);
    });
  }

  var removeEl = document.getElementById(product.removeBtn);
  if (removeEl) {
    removeEl.addEventListener("click", function () {
      removeProductById(product.removeTargetId);
    });
  }
}

cartProducts.forEach(bindProductHandlers);
