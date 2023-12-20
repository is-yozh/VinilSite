let productsGrid = document.getElementById('products-grid');
let productsAray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Dmitry-Krtadze/Vinil';

xhr.open('GET', url + '/products');
xhr.responseType = 'json';

xhr.onload = function(){
    let products = xhr.response;
    productAray = xhr.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        productsAray.push(p);
        let pElm = document.createElement('div');
        pElm.classList.add('product');
        pElm.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-price'><b>Price: </b>${p.price}</p>
            <p class='product-price'><b>Description: </b>${p.description}</p>
            <a href='userPage.html?id=${p.author_id}'>Seller profile</a>
            <button onclick="addProductToCart(${p.id});">Buy</button>
        `;
        productsGrid.append(pElm);
    });
}
xhr.send();

let cardProd = document.getElementById('cart-products');
let cart = [];

if(localStorage.getItem('cart'))
{
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function addProductToCart(id){
    let product = productsAray.find(function(p){
        return p.id == id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function drawCartProducts(){
    if(cart.length === 0) return cardProd.innerHTML = 'Cart is empty';
    cardProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p){
        cardProd.innerHTML += `
            <p><img src="${p.photo_url}">
                ${p.name} | ${p.price} $
            </p>
            <hr>

        `;
        sum += p.price;
    });
    cardProd.innerHTML += `
        <b>Total Price: ${sum} $</b>
        <button onclick="buyAll();">Buy All</button>
    `;
    localStorage.setItem('cart', '[]');
}

function buyAll(){
    cart = [];
    cardProd.innerHTML = 'Money was withdraw from your credit card';
}


function openCart(){
    cardProd.classList.toggle('hide');
}