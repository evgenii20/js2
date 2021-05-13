const products = [
    {id: 1, title: 'Keyboard', price: 5000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Notebook', price: 20000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price) =>
    // return `<div class="product-item">
    // <img class="bd-placeholder-img card-img-top">
    ` <div class="card mb-4 shadow-sm">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
                </div>`;


// const renderProducts = (list) => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price);
//     }).join('');
//
//     console.log(productList);
//     document.querySelector('.products').innerHTML = productList;
// }
const renderProducts = list => {
    document.querySelector('.products').insertAdjacentHTML("beforeend", list.map(item =>
        renderProduct(item.title, item.price)).join(''));
}

renderProducts(products);
