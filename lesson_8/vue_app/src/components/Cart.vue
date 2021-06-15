<template>
  <!--  <div v-show="isVisibleCart" class="cart-block">-->
  <!--  <div class="cart">-->
  <div v-show="isVisibleCart" class="cart-block">
    Корзина:
    <!--          <p v-if="!products.length">Корзина пуста</p>&ndash;&gt;-->
    <!--        <p v-if="!products.length">Корзина пуста</p>-->
    <!--        &lt;!&ndash;          Корзина:&ndash;&gt;-->
    <!--    <div class="cart-block">-->
    <div class="cart-list">
      <div v-for="item in cartProducts" :key="item.id_product" class="product-item">
        <Wrapper>
          <h3>{{ item.product_name }}</h3>
        </Wrapper>
        <p>{{ item.price }}</p>
        <button @click="onClick(item)">Удалить</button>
      </div>
    </div>
    <!--    </div>-->
  </div>
  <!--  </div>-->
</template>

<script>
// import Wrapper from './Wrapper.vue'

const API = 'http://localhost:3000';

export default {
  name: "Cart",
  // поскольку "isVisibleCart" приходит к нам из вне, поэтому используем props
  props: {
    isVisibleCart: {
      type: Boolean,
      default: false,
    },
    cartProducts: {
      type: Array,
      default: () => ([]),
    },
    postJson: {
      type: Function,
      default: () => null,
    },
    getJson: {
      type: Function,
      default: () => null,
    },
  //  без описания в props: getCart не удаляет товар из корзины
    getCart: {
      type: Function,
      default: () => null,
    },
  },
  methods: {
    onClick(item) {
      // Удаление товара
      // $emit - отлавливаем 'filter-products' с 'App.vue'
      // this.$emit('filter-products', this.userSearch)
      // this.postJson(`${API}/addToCart`, this.item)
      // после удаления товара, ещё раз запрашиваем список товаров
      this.postJson(`${API}/deleteFromCart`, item)
          .then(() => this.getCart())
      // this.$emit('toggle-cart', this.toggleCartStatus)
    },
  },
}
</script>

<style scoped>

</style>