// product-item.js
const template = document.createElement('template');

template.innerHTML = `
  <style>
    @import "./styles/styles.css"
  </style>
  <li class="product">
    <img src="" alt="" width=200>
    <p class="title"></p>
    <p class="price"></p>
    <button></button>
  </li>
`;

class ProductItem extends HTMLElement {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.productImg = this.shadowRoot.querySelector('img');
    this.productTitle = this.shadowRoot.querySelector('.title');
    this.productPrice = this.shadowRoot.querySelector('.price');
    this.productBtn = this.shadowRoot.querySelector('button');
    this.inCart = false;
  }

  connectedCallback() {
    let currentCart = localStorage.getItem('cart').split(',');
    this.inCart = (currentCart.indexOf(String(this.id)) > -1);

    if (this.inCart) {
      this.productBtn.innerHTML = 'Remove from Cart';
      this.productBtn.addEventListener('click', this.removeFromCart);
    } else {
      this.productBtn.innerHTML = 'Add to Cart';
      this.productBtn.addEventListener('click', this.addToCart);
    }

    this.productImg.setAttribute('src', this.imgSrc);
    this.productImg.setAttribute('alt', this.title);
    this.productTitle.innerHTML = this.title;
    this.productPrice.innerHTML = this.price;
  }

  addToCart() {
    alert('Added to Cart!');
    let currentCart = localStorage.getItem('cart').split(',');
    currentCart.push(this.id);
    document.getElementById('cart-count').innerHTML = String(currentCart.length-1);
    localStorage.setItem('cart', currentCart.toString());
    this.inCart = true;
    this.productBtn.removeEventListener('click', this.addToCart);
    this.productBtn.innerHTML = 'Remove from Cart';
    this.productBtn.addEventListener('click', this.removeFromCart);
  }

  removeFromCart() {
    alert('Removed from Cart!');
    let currentCart = localStorage.getItem('cart').split(',');
    currentCart.splice(currentCart.indexOf(this.id), 1);
    document.getElementById('cart-count').innerHTML = String(currentCart.length-1);
    localStorage.setItem('cart', currentCart.toString());
    this.inCart = false;
    this.productBtn.removeEventListener('click', this.removeFromCart);
    this.productBtn.innerHTML = 'Add to Cart';
    this.productBtn.addEventListener('click', this.addToCart);
  }

  get imgSrc() {
    return this.getAttribute('imgSrc');
  }

  get title() {
    return this.getAttribute('title');
  }

  get price() {
    return this.getAttribute('price');
  }

  get id() {
    return this.getAttribute('id');
  }

  set imgSrc(value) {
    this.setAttribute('imgSrc', value);
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  set price(value) {
    this.setAttribute('price', value);
  }

  set id(value) {
    this.setAttribute('id', value);
  }
}

customElements.define('product-item', ProductItem);