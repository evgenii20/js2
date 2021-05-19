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

class ProductList {
    // Список продуктов
    // объявление приватного свойства
    // #goods;
    goods;
    // #allProducts;
    allProducts;

    // селектор (класс: ".products") блока для генерации разметки на странице
    constructor(container = '.products') {
        console.log('constructor')
        this.container = container;
        this.goods = []; // промежуточный ответ от сервера
        this.allProducts = []; // текущее состояние списка

        this.fetchGoods();

        this.sum();
        // this.#render();
        this.render();

    }

    fetchGoods() {
        // this.#goods = [
        this.goods = [
            { id: 1, title: 'Keyboard', price: 5000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Notebook', price: 20000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    /**
     * Возвращает сумму товаров
     * @returns {number}
     */
    sum() { // reduce - позволяет с аккумулировать 2 параметра и вернуть одно значение "sumCart" ,
        // "0" - значение по умолчанию
        // console.log(this.#goods.reduce((sumCart, {price}) => sumCart + price, 0));
        // return this.#goods.reduce((sumCart, {price}) => sumCart + price, 0);
        return this.goods.reduce((sumCart, { price }) => sumCart + price, 0);
    }

    // #render() {
    render() {
        const block = document.querySelector(this.container)

        // forEach - метод перебора массива, но не изменяет его
        // this.#goods.forEach((product) => {
        this.goods.forEach((product) => {
            // на основе этих данных создаю новый экземпляр класса
            const productObject = new ProductItem(product);
            console.log(productObject);

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());

        });
    }
}

class ProductItem {
    // Конкретный товар
    //     constructor(product, img = 'https://placehold.it/200x150') {
    constructor(product, img = '') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    // Генерируем разметку страницы
    render() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>                    
                  </div>
                </div>`;
    }
}

/**
 * Корзина товаров
 */
class Cart extends ProductList {
    // Корзина товара

    // constructor(product, img = '', container = '.cart-sum'){
    constructor(product) {
        // container = '.cart-sum') {
        //     this.container = container;
        super(product);
    }

    cartAdd() {
        //  Метод добавления товаров в корзину

    }

    cartDel() {
        // Метод удаления товаров
    }

    // render() {
    // }

}

class cartItem extends ProductItem {
    // Корзина конкретного товара
    constructor(product, countItem) {
        super(product);
        this.countItem = 0;
    }

    addItem() {
        // Метод добавления товара
    }

    delItem() {
        // Метод удаления товара
    }
}

// Инициализируем
const productList = new ProductList();
// const cart = new Cart();
