<template>
  <header>
    <div class="logo">Интернет-магазин</div>
    <div class="cart">
      <!--      <SearchForm :products="userSearch"/>-->

      <form action="#" class="search-form">
        
        <input type="text" class="search-field" v-model="searchValue">
        
        <button class="btn-search" type="submit" @click="onClick">Найти
          
          <i class="fas fa-search"></i>
        </button>
      </form>

      <button class="btn-cart" type="button" @click="$emit('toggle-cart')">Корзина</button>
      
      <!-- вынес в Cart.vue -->
      
    </div>
    
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