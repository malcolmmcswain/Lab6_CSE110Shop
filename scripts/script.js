// Script.js

if (!localStorage.getItem('cart')) {
  let emptyCart = [];
  localStorage.setItem('cart', emptyCart.toString());
} else {
  let currentCart = localStorage.getItem('cart').split(',');
  document.getElementById('cart-count').innerHTML = String(currentCart.length-1);
}

window.addEventListener('DOMContentLoaded', () => {
  let products = JSON.parse(localStorage.getItem('products'));
  if (products == null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem('products', JSON.stringify(data));
        products = data;

        let productListContainer = document.getElementById('product-list');
        products.map((product) => {
          let productItem = document.createElement('product-item');
          productItem.setAttribute('imgSrc', product.image);
          productItem.setAttribute('title', product.title);
          productItem.setAttribute('price', String(product.price));
          productItem.setAttribute('id', String(product.id));
          productListContainer.appendChild(productItem);
        });
      });
  } else {
    let productListContainer = document.getElementById('product-list');
    products.map((product) => {
      let productItem = document.createElement('product-item');
      productItem.setAttribute('imgSrc', product.image);
      productItem.setAttribute('title', product.title);
      productItem.setAttribute('price', String(product.price));
      productItem.setAttribute('id', String(product.id));
      productListContainer.appendChild(productItem);
    });
  }
});