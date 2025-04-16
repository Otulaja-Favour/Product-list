let part1 = document.getElementById('part1');

let cart = {};   // Track all items and their quantities

async function retrievingData() {
  try {
    const response = await fetch('data.json');
    const result = await response.json();
    console.log(result);

    result.forEach(element => {
      let cartprice = 1;
      let cartData = document.createElement('div');
      cartData.classList.add('cart');

      cartData.innerHTML = `
        <div id="image">
          <img id="img" src="${element.image.desktop}" alt="">
          <button id="carted"><img id="decrease" src="./assets/images/icon-decrement-quantity.svg" alt=""> <span class="qty">${cartprice}</span><img id="increase" src="./assets/images/icon-increment-quantity.svg" alt=""></button> 
          <button id="add"><img src="/assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
        </div>
        <p id="name">${element.category}</p>
        <h5 id="namefeature">${element.name}</h5>
        <p id="price" class="mt-3">$${element.price.toFixed(2)}</p>
      `;

      part1.appendChild(cartData);

      let addData = cartData.querySelector('#add');
      let cartedData = cartData.querySelector('#carted');
      let perCountCart = document.createElement('div');
      let cartCount = document.getElementById('count');
      let increase = cartData.querySelector('#increase');
      let decrease = cartData.querySelector('#decrease');
      let span = cartData.querySelector('.qty');

      addData.addEventListener('click', () => {
        addData.style.display = 'none';
        cartData.style.display = 'block'
        cartedData.style.display = 'flex';
        span.textContent = cartprice;

        document.getElementById('image1').style.display = 'none';
        document.getElementById('Confirm').style.display = 'block';

        cart[element.name] = {
          quantity: cartprice,
          price: element.price
        };
        perCountCart.innerHTML = `<h6>${element.name}</h6><img src="./assets/images/icon-remove-item.svg" alt=""></img>

          <p>${cartprice}x ${element.price.toFixed(2)}  $${(element.price * cartprice).toFixed(2)}<span id="del">
</span></p>`;


          document.querySelector('#del').addEventListener('click', ()=>{

            perCountCart.style.display = 'none'
             addData.style.display = 'block';
        cartData.style.display = 'none'
        
        // cartCount.innerText = getTotalItemsInCart();
updateTotal()
          })
        cartCount.innerText = getTotalItemsInCart();
        updateTotal();
      });

      increase.addEventListener('click', () => {
        cartprice++;
        span.textContent = cartprice;
        document.getElementById('image1').style.display = 'none';

        cart[element.name].quantity = cartprice;

        perCountCart.innerHTML = `<h6>${element.name}</h6>
          <p>${cartprice}x ${element.price.toFixed(2)}  $${(element.price * cartprice).toFixed(2)}<span id="but"><img src="./assets/images/icon-remove-item.svg" alt=""></span></p>`;

        cartCount.innerText = getTotalItemsInCart();
        updateTotal();
      });

      decrease.addEventListener('click', () => {
        const image1 = document.getElementById('image1');

        if (cartprice === 1) {
          addData.style.display = 'block';
          cartedData.style.display = 'none';
          perCountCart.textContent = '';
          delete cart[element.name];

          if (image1) {
            image1.style.display = Object.keys(cart).length === 0 ? 'block' : 'none';
          }

          cartCount.innerText = getTotalItemsInCart();
          updateTotal();
          return;
        }

        cartprice--;
        span.textContent = cartprice;
        document.getElementById('image1').style.display = 'none';

        cart[element.name].quantity = cartprice;

        perCountCart.innerHTML = `<h6>${element.name}</h6>
          <p>${cartprice}x ${element.price.toFixed(2)} = $${(element.price * cartprice).toFixed(2)}<span>x</span></p>`;

        if (image1) {
          image1.style.display = Object.keys(cart).length === 0 ? 'block' : 'none';
        }

        cartCount.innerText = getTotalItemsInCart();
        updateTotal();
      });

      document.getElementById('percount').appendChild(perCountCart);
    });
  } catch (error) {
    console.error(`error`, error);
  }
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
// document.getElementById('count').innerText = getTotalItemsInCart();
