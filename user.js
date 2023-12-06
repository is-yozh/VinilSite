const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let profile = document.getElementById('profile');
let url = 'https://my-json-server.typicode.com/Dmitry-Krtadze/Vinil';

let urlRequest = new XMLHttpRequest();

userRequest = new XMLHttpRequest();
userRequest.open('GET', `${url}/users/${id}`);
userRequest.responseType = 'json';
userRequest.onload = function(){
    let user = userRequest.responseType;
    profile.innerHTML = `
        <h1>${user.name}</h1>
        <h2>${user.sirname}</h2>
        <img class="profile-img" src="${user.photo_url}">
        <p>Balanse: ${user.balance}</p>
    `
}
userRequest.send();