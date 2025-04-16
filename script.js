let part1 = document.getElementById('part1');
let cart = {};

async function retrievingData() {
  try {
    const response = await fetch('data.json');
    const result = await response.json();
    console.log(result);
    result.forEach(element => renderProduct(element));
  } catch (error) {
    console.error('error', error);
  }
}

function renderProduct(element) {
  let cartprice = 1;
  let cartData = document.createElement('div');
  cartData.classList.add('cart');

  cartData.innerHTML = `
    <div id="image">
      <img id="img" src="${element.image.desktop}" alt="">
      <button id="carted"><img id="decrease" src="./assets/images/icon-decrement-quantity.svg" alt="">
        <span class="qty">${cartprice}</span>
        <img id="increase" src="./assets/images/icon-increment-quantity.svg" alt="">
      </button>
      <button id="add"><img src="/assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
    </div>
    <p id="name">${element.category}</p>
    <h5 id="namefeature">${element.name}</h5>
    <p id="price" class="mt-3">$${element.price.toFixed(2)}</p>
  `;

  part1.appendChild(cartData);

  let addData = cartData.querySelector('#add');
  let cartedData = cartData.querySelector('#carted');
  let increase = cartData.querySelector('#increase');
  let decrease = cartData.querySelector('#decrease');
  let span = cartData.querySelector('.qty');
  let cartCount = document.getElementById('count');
  let perCountCart = document.createElement('div');

  document.getElementById('percount').appendChild(perCountCart);

  addData.addEventListener('click', () => handleAddToCart(element, cartData, cartedData, addData, span, cartprice, perCountCart));
  increase.addEventListener('click', () => handleIncrease(element, span, cartprice++, perCountCart));
  decrease.addEventListener('click', () => {
    cartprice--;
    handleDecrease(element, cartprice, span, cartedData, addData, perCountCart, cartData);
  });
}

function handleAddToCart(element, cartData, cartedData, addData, span, cartprice, perCountCart) {
  addData.style.display = 'none';
  cartedData.style.display = 'flex';
  span.textContent = cartprice;

  document.getElementById('image1').style.display = 'none';
  document.getElementById('Confirm').style.display = 'block';

  cart[element.name] = {
    quantity: cartprice,
    price: element.price
  };

  perCountCart.innerHTML = `<h6>${element.name}</h6>
    <p>${cartprice}x ${element.price.toFixed(2)}  $${(element.price * cartprice).toFixed(2)}
    <span id="del"><img src="./assets/images/icon-remove-item.svg" alt=""></span></p>`;

  perCountCart.querySelector('#del').addEventListener('click', () => {
    perCountCart.style.display = 'none';
    addData.style.display = 'block';
    cartedData.style.display = 'none';
    delete cart[element.name];
    document.getElementById('count').innerText = getTotalItemsInCart();
    updateTotal();
  });

  document.getElementById('count').innerText = getTotalItemsInCart();
  updateTotal();
}

function handleIncrease(element, span, cartprice, perCountCart) {
  cartprice++;
  span.textContent = cartprice;

  document.getElementById('image1').style.display = 'none';
  cart[element.name].quantity = cartprice;

  perCountCart.innerHTML = `<h6>${element.name}</h6>
    <p>${cartprice}x ${element.price.toFixed(2)}  $${(element.price * cartprice).toFixed(2)}
    <span id="but"><img src="./assets/images/icon-remove-item.svg" alt=""></span></p>`;

  document.getElementById('count').innerText = getTotalItemsInCart();
  updateTotal();
}

function handleDecrease(element, cartprice, span, cartedData, addData, perCountCart, cartData) {
  const image1 = document.getElementById('image1');

  if (cartprice < 1) {
    cartprice = 1; // Prevent negative
    return;
  }

  span.textContent = cartprice;

  if (cartprice === 1) {
    addData.style.display = 'block';
    cartedData.style.display = 'none';
    perCountCart.textContent = '';
    delete cart[element.name];

    if (image1) {
      image1.style.display = Object.keys(cart).length === 0 ? 'block' : 'none';
    }

    document.getElementById('count').innerText = getTotalItemsInCart();
    updateTotal();
    return;
  }

  cart[element.name].quantity = cartprice;

  perCountCart.innerHTML = `<h6>${element.name}</h6>
    <p>${cartprice}x ${element.price.toFixed(2)} = $${(element.price * cartprice).toFixed(2)}
    <span>x</span></p>`;

  if (image1) {
    image1.style.display = Object.keys(cart).length === 0 ? 'block' : 'none';
  }

  document.getElementById('count').innerText = getTotalItemsInCart();
  updateTotal();
}

function updateTotal() {
  let total = 0;
  for (let item in cart) {
    total += cart[item].quantity * cart[item].price;
  }
  document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

function getTotalItemsInCart() {
  let totalItems = 0;
  for (let item in cart) {
    totalItems += cart[item].quantity;
  }
  return totalItems;
}

retrievingData();
