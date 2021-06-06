<template>
  <form action="#" class="search-form">
    <!--  <form action="#" class="search-form" @click="$parent.filters(userSearch)">-->
    <!--    <input v-model="userSearch" type="text" class="search-field">-->
    <!--    @filter-products="filters"-->
    <!--    <input v-model="userSearch" type="text" class="search-field">-->
    <label>
      <input type="text" class="search-field" v-model="userSearch">
    </label>
    <!--    <button class="btn-search" type="submit" @click="filters">Найти-->
    <button class="btn-search" type="submit" @click="onClick">Найти
      <!--    <button class="btn-search" type="submit">Найти-->
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
// import Wrapper from "./Wrapper";

export default {
  // name: "SearchForm",
  // вынес в App.vue
  // // отображение данных на странице из модуля ProductsList
  props: {
    // msg: String
    products: {
      type: Array,
      default: () => [],
    },
    // userSearch,

  },

  data: () => ({
    // imgCatalog: './placeholder_200x150.png',
    // связываем input в шаблоне с переменной "userSearch"
    // searchValue: '',
    userSearch: '',
  }),

  methods: {
    // Для передачи аргументов создадим fun "onClick"
    onClick() {
      // $emit - отлавливаем 'filter-products' с 'App.vue'
      // this.$emit('filter-products', this.userSearch)
      this.$emit('filter-products', this.userSearch)
    }
    // ProductsList,
    // Wrapper,
  },

  // //s 2-й вариант:
  // filters(value) {
  //   const regexp = new RegExp(value, 'i');
  //   this.filtered = this.products.filter(product => regexp.test(product.product_name));
  //
  // },

  // из "App.vue"
  // watch: {
  //   //searchLine
  //   // searchValue()
  //   userSearch() {
  //     // filterGoods
  //     // this.filters();
  //     this.onClick();
  //   }
  // }


}
</script>

<!--<style scoped>-->

<!--</style>-->