<template>
  <!--  3) используем-->
  <div id="app">
    <header>
      <div class="logo">Интернет-магазин</div>
      <div class="cart">
        <form action="#" class="search-form">
          <input v-model="userSearch" type="text" class="search-field">
          <button class="btn-search" type="submit" @click="filters">Найти
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="btn-cart" type="button" @click="toggleCartStatus">Корзина</button>
<!--        <div v-show="isVisibleCart" class="cart-block invisible"></div>-->
<!--&lt;!&ndash;        <div v-show="isVisibleCart" class="cart"></div>&ndash;&gt;-->
      </div>
      <div>
<!--        <button class="btn-cart" type="button" @click="toggleCartStatus">Корзина</button>-->
<!--        <div v-show="isVisibleCart" class="cart-block invisible"></div>-->
<!--        <div v-show="isVisibleCart" class="cart1">Корзина</div>-->
      </div>
    </header>
    <main>
      <div class="products">
        <!--        <div class="product-item" v-for="product of products" :key="product.id_product">-->
        <div class="product-item" v-for="item in filtered" :key="item.id_product">
          <img :src="imgCatalog" alt="Some img">
          <div class="desc">
            <!--            <h3>{{ product.product_name }}</h3>-->
            <h3>{{ item.product_name }}</h3>
            <!--            <p>{{ product.price }}₽</p>-->
            <p>{{ item.price }} руб.</p>
<!--            <button class="buy-btn" @click="addProduct(product)">Купить</button>-->
            <button class="buy-btn" >Купить</button>
          </div>
        </div>
      </div>
      <!--      <GoodsList :goods="filtered" />-->
      <br/>
      <div v-show="isVisibleCart" class="cart1">
<!--      <div class="cart">-->
        Корзина:
        <div class="cart-list"></div>
      </div>
    </main>
  </div>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="fhjWelcome to Your Vue.js App"/>-->
</template>

<script>
// 1. Добавить значение searhLine и связать его с инпутом
// 2. Добавить метод который отфильтрует наш список filteredGoods на основе searchLine
// 3. isVisibleCart добавить и добавить кнопку Корзина, которая будетиметь обработчик меняющий состояние переменной isVisibleCart (true/false)

// 1) импортируем
// import HelloWorld from './components/HelloWorld.vue'

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

export default {
  // 2) регистрируем в "components"
  // name: 'App',
  // components: {
  //   HelloWorld
  // },

  mounted() {
    this.getJson(`${API}/catalogData.json`)
  },

  data: () => ({
    //  из class List
    // this.url = url;     // часть url адреса для импорта json
    catalogUrl: '/addToBasket.json',     // часть url адреса для импорта json
    products: [],
    imgCatalog: '',
    allProducts: [],
    isVisibleCart: false,
    filtered: [], // отфильтрованные товары
    userSearch: '',
  }),

  methods: {
    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | void>}
     */
    getJson(url) {
      // responce - ответ
      // с использованием промисов (fetch):
      // return fetch(url ? url : `${API + this.url}`)
      return fetch(url)
          // .then(result => result.json())
          .then((data) => data.json())
          .then((data) => {
            // this.goods = data;
            this.products = data;
            // this.filteredGoods = data;
            this.filtered = data;
          })
          // catch - ловить
          .catch(error => {
            console.log(error);
          })
    },


    /**
     * метод поиска товаров
     * @param value - поисковый запрос
     */
    // filter(value) {
    // filterGoods
    filters() {
      const regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      // this.allProducts.forEach(el => {
      //   const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      //   if (!this.filtered.includes(el)) {
      //     block.classList.add('invisible');
      //   } else {
      //     block.classList.remove('invisible');
      //   }
      // })
    },

    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    },

  },
  watch: {
    userSearch() {
      this.filters();
    }
  }

}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'SF Pro Display', sans-serif;
}

header {
  display: flex;
  /*background-color: #2f2a2d;*/
  background-color: #2f85cd;
  justify-content: space-between;
  color: #fafafa;
  padding: 30px 80px;
}

button:focus {
  outline: none;
}

.logo {

  text-transform: uppercase;
  font-weight: bold;
}

.btn-cart {
  background-color: #fafafa;
  padding: 10px 20px;
  border: 1px solid transparent;
  color: #2f2a2d;
  border-radius: 5px;
  transition: all ease-in-out .4s;
  cursor: pointer;
}

.btn-cart:hover {
  background-color: transparent;
  border-color: #fafafa;
  color: #fafafa;
}

.btn-cart, .logo {
  align-self: center;
}

/*.products {*/
/*display: flex;*/
/*justify-content: space-between;*/
/*flex-wrap: wrap;*/
/*padding: 40px 80px;*/
/*}*/
.products {
  column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 1fr;
  padding: 40px 80px;
  justify-content: space-between;
}

p {
  margin: 0 0 5px 0;
}

.product-item {
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
}

img {
  max-width: 100%;
  height: auto
}

.desc {
  border: 1px solid #c0c0c040;
  padding: 15px
}

.cart {
  position: relative;
}

.cart1 {
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  padding: 20px;
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: auto;
}

.cart-block {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
  border-radius: 5px;
  box-sizing: border-box;
  right: 0;
  top: 130%;
  position: absolute;
  background-color: white;
  padding: 20px;
  color: black;
  width: 300px;
}

.invisible {
  display: none;
}

.cart-block:before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  right: 35px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}

.buy-btn, .del-btn {
  margin-top: 5px;
  /*background-color: #2f2a2d;*/
  background-color: #2f85cd;
  padding: 5px 15px;
  border: 1px solid transparent;
  color: #fafafa;
  border-radius: 5px;
  transition: all ease-in-out .4s;
  cursor: pointer;
}

.buy-btn:hover, .del-btn:hover {
  background-color: #fafafa;
  color: #2f2a2d;
  border: 1px solid #2f2a2d;
}

.cart-item {
  display: flex;
  justify-content: space-between;
}

.cart-item:not(:last-child) {
  margin-bottom: 20px;
}

.product-bio {
  display: flex;
}

.cart-item img {
  align-self: flex-start;
  margin-right: 15px;
}

.product-single-price {
  color: #474747;
  font-size: 0.5em;
}

.product-price {
  margin-left: 30px;
}

.product-desc {
  max-width: 150px;
}

.product-quantity {
  margin-top: 15px;
  font-size: 0.75em;
}

.right-block {
  text-align: right;
}

.btn-search {
  background-color: transparent;
  border: none;
  color: #fafafa;
  font-size: 1.2em;
  position: absolute;
  bottom: 5px;
  right: 0;
}

.search-form {
  position: relative;
  margin-right: 50px;
  display: inline-block;
}

.search-field:focus {
  outline: none;
}

.search-field {
  box-sizing: border-box;
  width: 200px;
  color: #fafafa;
  padding: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #fafafa;
}

</style>
