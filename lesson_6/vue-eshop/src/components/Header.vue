<template>
  <header>
    <div class="logo">Интернет-магазин</div>
    <div class="cart">
      <SearchForm :products="userSearch"/>
      <!--      <SearchForm :filter-products="$parent.filters(userSearch)" />-->
      <!--      <SearchForm @filter-products="$parent.filters(userSearch)" />-->

      <!--      <SearchForm @filter-products="$parent.filters(userSearch)" />-->
      <!--        <button class="btn-cart" type="button" @click="toggleCartStatus">Корзина</button>-->
      <button class="btn-cart" type="button" @click="$emit('toggle-cart')">Корзина</button>
      <!--      <Cart />-->
      <!--        <div v-show="isVisibleCart" class="cart-block invisible"></div>-->
      <!--&lt;!&ndash;        <div v-show="isVisibleCart" class="cart"></div>&ndash;&gt;-->
      <!--      <div v-show="isVisibleCart" class="cart1">-->

      <!-- вынес в Cart.vue -->
      <!--      <div v-show="isVisibleCart" class="cart-block">-->
      <!--&lt;!&ndash;        &lt;!&ndash;      <div class="cart">&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;        &lt;!&ndash;          <p v-if="!products.length">Корзина пуста</p>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;        <p v-if="!products.length">Корзина пуста</p>&ndash;&gt;-->
      <!--&lt;!&ndash;        &lt;!&ndash;          Корзина:&ndash;&gt;&ndash;&gt;-->
      <!--        <div class="cart-list"></div>-->
      <!--      </div>-->
    </div>
<!--    <div>-->
<!--      &lt;!&ndash;        <button class="btn-cart" type="button" @click="toggleCartStatus">Корзина</button>&ndash;&gt;-->
<!--      &lt;!&ndash;        <div v-show="isVisibleCart" class="cart-block invisible"></div>&ndash;&gt;-->
<!--      &lt;!&ndash;        <div v-show="isVisibleCart" class="cart1">Корзина</div>&ndash;&gt;-->
<!--    </div>-->
  </header>
</template>

<script>
// import SearchForm from "./SearchForm";
// import Cart from "./Cart";

import SearchForm from "./SearchForm";

export default {
  name: "Header",
  components: {SearchForm},
  // components: {Cart},
  data: () => ({
    // Header,
    // SearchForm,
    userSearch: '',
  }),

  methods: {
    onClick() {
      // $emit - отлавливаем 'filter-products' с 'App.vue'
      this.$emit('filter-products', this.userSearch)
      this.$emit('toggle-cart', this.toggleCartStatus)
    },
  },
  watch: {
    //searchLine
    userSearch() {
      // filterGoods
      // this.filters();
      this.onClick();
    }
  }
}
</script>

<style scoped>

</style>