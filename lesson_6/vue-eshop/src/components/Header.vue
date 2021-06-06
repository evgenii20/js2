<template>
  <header>
    <div class="logo">Интернет-магазин</div>
    <div class="cart">
      <!--      <SearchForm :products="userSearch"/>-->

      <form action="#" class="search-form">
        <!--  <form action="#" class="search-form" @click="$parent.filters(userSearch)">-->
        <!--    <input v-model="userSearch" type="text" class="search-field">-->
        <!--    @filter-products="filters"-->
        <!--    <input v-model="userSearch" type="text" class="search-field">-->
        <!--    <label>-->
        <!--      <input type="text" class="search-field" v-model="userSearch">-->
        <input type="text" class="search-field" v-model="searchValue">
        <!--    </label>-->
        <!--    <button class="btn-search" type="submit" @click="filters">Найти-->
        <button class="btn-search" type="submit" @click="onClick">Найти
          <!--    <button class="btn-search" type="submit" @click="onClick">Найти-->
          <!--    <button class="btn-search" type="submit">Найти-->
          <i class="fas fa-search"></i>
        </button>
      </form>

      <!--      <SearchForm :filter-products="$parent.filters(userSearch)" />-->
      <!--      <SearchForm @filter-products="$parent.filters(userSearch)" />-->

      <!--      <SearchForm @filter-products="$parent.filters(userSearch)" />-->
      <!--        <button class="btn-cart" type="button" @click="toggleCartStatus">Корзина</button>-->
      <!-- передадим в родительский компонент "$emit('toggle-cart')"-->
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

// import SearchForm from "./SearchForm";

export default {
  name: "Header",
  // components: {SearchForm},
  // components: {Cart},
  data: () => ({
    // Header,
    // SearchForm,
    // userSearch: '',
    searchValue: '',
  }),

  methods: {
    onClick() {
      // $emit - отлавливаем 'filter-products' с 'App.vue'
      // this.$emit('filter-products', this.userSearch)
      this.$emit('filter-products', this.searchValue)
      // this.$emit('toggle-cart', this.toggleCartStatus)
    },
  },
  watch: {
    //searchLine
    // userSearch() {
    searchValue() {
      // filterGoods
      // this.filters();
      this.onClick();
    }
  }
}
</script>

<style scoped>

</style>