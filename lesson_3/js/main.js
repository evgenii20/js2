//Для сокрытия внутреннего интерфейса мы используем защищённые или приватные свойства:
//
//     Защищённые поля имеют префикс _. Это хорошо известное соглашение, не поддерживаемое на уровне языка.
//     Программисты должны обращаться к полю, начинающемуся с _, только из его класса и классов, унаследованных
//     от него.(google, firefox)
//
//     Приватные поля имеют префикс #. JavaScript гарантирует, что мы можем получить доступ к таким полям
//     только внутри класса.(google)
//
// В настоящее время приватные поля не очень хорошо поддерживаются в браузерах, но можно использовать полифил.

//! 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
//! 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// /catalogData.json – получить список товаров;
// /getBasket.json – получить содержимое корзины;
// /addToBasket.json – добавить товар в корзину;
// /deleteFromBasket.json – удалить товар из корзины.


// Переведено на промисы
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//      // Здесь пишем асинхронный код
//      // В случае успешного выполнения вызываем колбэк resolve()
//      // В случае ошибки вызываем reject()
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         //  Первый параметр - тип запроса "GET"
//         //  Второй параметр - адрес ресурса "url"
//         //  Третий параметр - указатель асинхронности "true"
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//              // Этот код выполнится после выполнения запроса
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list;
        this.url = url;     // часть url адреса для импорта json
        this.goods = [];    // промежуточный ответ от сервера
        this.allProducts = []; // текущее состояние списка
        this.filtered = []; // отфильтрованные товары
        this._init(); //
    }

    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | void>}
     */
    getJson(url) {
        // responce - ответ
        // с использованием промисов (fetch):
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            // catch - ловить
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных из json
     * @param data
     */
    handleData(data) {
        // handle - управление, обработка
        this.goods = [...data];
        this.render();
    }

    /**
     * подсчёт стоимости всех товаров
     * @returns {*|number}
     */
    calcSum() {
        // accum - накопленный
        // this.allProducts - обращаемся к конструктору класса "List" за свойством
        return this.allProducts.reduce((accum, item) => accum + item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        // пробегаемся по элементам ответа от сервера
        for (let product of this.goods) {
            // проверка вызывающего класса "this.constructor.name"
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);
            // проверка созданного продукта(ов)
            console.log(productObj);
            // сохраняем текущее состояние списка
            this.allProducts.push(productObj);
            // выводим продукты
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }

    /**
     * метод поиска товаров
     * @param value - поисковый запрос
     */
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }

    _init() {
        return false
    }
}

/**
 * Описание класса конкретного продукта, вынесено отдельно от продукта
 */
class Item {
    constructor(el, img = '') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img; // img м.б. ссылкой "https://img_vsem.it/12.jpg"
    }

    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */

/**
 * Работа со списком продуктов, вывод на страницу
 */
class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    /**
     * Отслеживаем событие нажатия кнопки купить class="buy-btn"
     * @private
     */
    _init() {
        // evt - event
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.classList.contains('buy-btn')) {
                this.cart.addProduct(evt.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', evt => {
            evt.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}

/**
 * Вывод конкретного продукта на странице
 */
class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} руб.</p>
                        <button class="buy-btn"
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        // вызов метода "getJson()" от родителя
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    /**
     * Добавление товара
     * @param element
     */
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                // если id вывбранного товара строго равно 1, то
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                        // При добавлении нового товара, нас интересует только он один.
                        this.goods = [product];
                        // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCart(find);
                    } else { // удаляем
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * обновляем данные корзины
     * @param product
     * @private
     */
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeProduct(evt.target);
            }
        });
    }

}

/**
 * Конкретный продукт в корзине
 */
class CartItem extends Item {
    constructor(el, img = '') {
        super(el, img); // наследуемые свойства от родителя
        this.quantity = el.quantity; // уникальное свойство для класса
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity * this.price} руб.</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
            </div>
            </div>`;
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

// Инициализируем
let cart = new Cart();
let products = new ProductsList(cart);


// class ProductList {
// // Список продуктов
//     // объявление приватного свойства
//     _goods;
//     // goods;
//     _allProducts;
//     // allProducts;
//
//     // селектор (класс: ".products") блока для генерации разметки на странице
//     constructor(container = '.products') {
//         console.log('constructor')
//         this.container = container;
//         // свойство "_goods" не приватное, просто есть договорённость использования
//         // this._goods = [];
//         this._goods = []; // промежуточный ответ от сервера
//         // this.goods = []; // промежуточный ответ от сервера
//         this._allProducts = []; // текущее состояние списка
//         // this.allProducts = []; // текущее состояние списка
//
//         this._fetchGoods();
//         // this.fetchGoods();
//
//         this.sum();
//         this._render();
//         // this.render();
//
//     }
//
//     // Приватный метод, будет ходить за товаром на сервер
//     _fetchGoods() {
//     // fetchGoods() {
//         this._goods = [
//         // this.goods = [
//             {id: 1, title: 'Keyboard', price: 5000},
//             {id: 2, title: 'Mouse', price: 1500},
//             {id: 3, title: 'Notebook', price: 20000},
//             {id: 4, title: 'Gamepad', price: 4500},
//         ];
//     }
//
//     /**
//      * Возвращает сумму товаров
//      * @returns {number}
//      */
//     sum() { // reduce - позволяет с аккумулировать 2 параметра и вернуть одно значение "sumCart" ,
//         // "0" - значение по умолчанию
//         // console.log(this._goods.reduce((sumCart, {price}) => sumCart + price, 0));
//         // return this._goods.reduce((sumCart, {price}) => sumCart + price, 0);
//         // return this.goods.reduce((sumCart, {price}) => sumCart + price, 0);
//         // return this.goods.reduce((sumCart, item) => {
//         const totalSum = this._goods.reduce((sumCart, item) => {
//             sumCart[item.title] = item;
//             return sumCart;
//         }, {});
//         console.log(totalSum);
//     }
//     // результат:
//     // {Keyboard: {…}, Mouse: {…}, Notebook: {…}, Gamepad: {…}}
//     // Gamepad: {id: 4, title: "Gamepad", price: 4500}
//     // Keyboard: {id: 1, title: "Keyboard", price: 5000}
//     // Mouse: {id: 2, title: "Mouse", price: 1500}
//     // Notebook: {id: 3, title: "Notebook", price: 20000}
//     // __proto__: Object
//
//     _render() {
//     // render() {
//         const block = document.querySelector(this.container)
//
//         // forEach - метод перебора массива, но не изменяет его
//         this._goods.forEach((product) => {
//         // this.goods.forEach((product) => {
//             // на основе этих данных создаю новый экземпляр класса
//             const productObject = new ProductItem(product);
//             console.log(productObject);
//
//             // кладём в массив экземпляр класса в пустой массив
//             this._allProducts.push(productObject);
//             // this.allProducts.push(productObject);
//             // обращаемся к блоку      в конец         , без инкапсулирования, т.к. его необходимо время от времени вызывать
//             block.insertAdjacentHTML('beforeend', productObject.render());
//
//         });
//     }
// }
//
// class ProductItem {
// // Конкретный товар
// //     constructor(product, img = 'https://placehold.it/200x150') {
//     constructor(product, img = '') {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//         this.img = img;
//     }
//
//     // Генерируем разметку страницы
//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                   <img src="${this.img}" alt="Some img">
//                   <div class="desc">
//                     <h3>${this.title}</h3>
//                     <p>${this.price}</p>
//                     <button class="buy-btn">Купить</button>
//                   </div>
//                 </div>`;
//     }
// }
//
// /**
//  * Корзина товаров
//  */
// class Cart extends ProductList {
//     // Корзина товара
//
//     // constructor(product, img = '', container = '.cart-sum'){
//     constructor(product) {
//         // container = '.cart-sum') {
//         //     this.container = container;
//         super(product);
//     }
//
//     cartAdd() {
//         //  Метод добавления товаров в корзину
//
//     }
//
//     cartDel() {
//         // Метод удаления товаров
//     }
//
//     // render() {
//     // }
//
// }
//
// class cartItem extends ProductItem {
//     // Корзина конкретного товара
//     constructor(product, countItem) {
//         super(product);
//         this.countItem = 0;
//     }
//
//     addItem() {
//         // Метод добавления товара
//     }
//
//     delItem() {
//         // Метод удаления товара
//     }
// }
//
// // Инициализируем
// const productList = new ProductList();
// // Вызов метода
// productList.sum();
// // const cart = new Cart();
//
//
// // lesson_1:
// // const products = [
// //     {id: 1, title: 'Keyboard', price: 5000},
// //     {id: 2, title: 'Mouse', price: 1500},
// //     {id: 3, title: 'Notebook', price: 20000},
// //     {id: 4, title: 'Gamepad', price: 4500},
// // ];
// //
// // const renderProduct = (title, price) =>
// //     // return `<div class="product-item">
// //     // <img class="bd-placeholder-img card-img-top">
// //     ` <div class="card mb-4 shadow-sm">
// //                 <h3>${title}</h3>
// //                 <p>${price}</p>
// //                 <button class="by-btn">Добавить в корзину</button>
// //                 </div>`;
// //
// //
// // // const renderProducts = (list) => {
// // //     const productList = list.map((item) => {
// // //         return renderProduct(item.title, item.price);
// // //     }).join('');
// // //
// // //     console.log(productList);
// // //     document.querySelector('.products').innerHTML = productList;
// // // }
// // const renderProducts = list => {
// //     document.querySelector('.products').insertAdjacentHTML("beforeend", list.map(item =>
// //         renderProduct(item.title, item.price)).join(''));
// // }
// //
// // renderProducts(products);
// // ----/ lesson_1 ----