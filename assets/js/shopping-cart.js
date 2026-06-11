function getElement(id) {
  var el = document.getElementById(id);
  if (!el) {
    console.error('Element not found: #' + id);
  }
  return el;
}

function addClickListener(id, handler) {
  var el = getElement(id);
  if (el) {
    el.addEventListener("click", handler);
  }
}

function productQuantityUpdate(isIncrease, productQuantityFieldId) {
  const productQuantityField = getElement(productQuantityFieldId);
  if (!productQuantityField) return 0;

  const productPreviusQuantity = parseInt(productQuantityField.value, 10);
  if (isNaN(productPreviusQuantity)) {
    console.error('Invalid quantity value for #' + productQuantityFieldId);
    return 0;
  }
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
  const el = getElement(productPriceId);
  if (!el) return;
  el.innerText = productTotalPrice;
  updateEverythings();
}

function subtotalPriceUpdate() {
  let subtotalPrice = 0;
  const productsPrice = document.getElementsByClassName("products-price");
  for (const productPrice of productsPrice) {
    const parsed = parseFloat(productPrice.innerText);
    if (!isNaN(parsed)) {
      subtotalPrice += parsed;
    }
  }

  const el = getElement("subtotalPrice");
  if (!el) return subtotalPrice;
  return (el.innerText = subtotalPrice);
}

function taxOfTotalPriceUpdate() {
  const subtotalPrice = subtotalPriceUpdate();
  const taxPercentage = 10;
  const taxOfTotalPrice = (subtotalPrice * taxPercentage) / 100;
  const el = getElement("totalTaxAmount");
  if (!el) return taxOfTotalPrice;
  return (el.innerText = taxOfTotalPrice);
}

function totalPriceUpdate() {
  const total = subtotalPriceUpdate() + taxOfTotalPriceUpdate();
  const el = getElement("totalPrice");
  if (!el) return total;
  return (el.innerText = total);
}

function removeProductById(productId) {
  const product = getElement(productId);
  if (!product) return;
  if (!product.parentNode) {
    console.error('Element #' + productId + ' has no parent node');
    return;
  }
  product.parentNode.removeChild(product);
  updateEverythings();
}

function updateEverythings() {
  subtotalPriceUpdate();
  taxOfTotalPriceUpdate();
  totalPriceUpdate();
}

updateEverythings();

// ================================

addClickListener("productOneQuantityIncrease", function () {
  const productQuantityFieldId = "productOneQuantity";
  const productPriceId = "productOnePrice";
  const productCurrentQuantity = productQuantityUpdate(
    true,
    productQuantityFieldId
  );
  productPriceUpdate(1250, productCurrentQuantity, productPriceId);
});

addClickListener("productOneQuantityDecrease", function () {
  const productQuantityFieldId = "productOneQuantity";
  const productPriceId = "productOnePrice";
  const productCurrentQuantity = productQuantityUpdate(
    false,
    productQuantityFieldId
  );
  productPriceUpdate(1250, productCurrentQuantity, productPriceId);
});

addClickListener("removeProductOne", function () {
  removeProductById("cartItems");
});

addClickListener("productTwoQuantityIncrease", function () {
  const productQuantityFieldId = "productTwoQuantity";
  const productPriceId = "productTwoPrice";
  const productCurrentQuantity = productQuantityUpdate(
    true,
    productQuantityFieldId
  );
  productPriceUpdate(50, productCurrentQuantity, productPriceId);
});

addClickListener("productTwoQuantityDecrease", function () {
  const productQuantityFieldId = "productTwoQuantity";
  const productPriceId = "productTwoPrice";
  const productCurrentQuantity = productQuantityUpdate(
    false,
    productQuantityFieldId
  );
  productPriceUpdate(50, productCurrentQuantity, productPriceId);
});

addClickListener("removeProductTwo", function () {
  removeProductById("productTwo");
});
