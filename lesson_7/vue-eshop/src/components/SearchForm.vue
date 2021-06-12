<template>
  <form action="#" class="search-form">
    
      <input type="text" class="search-field" v-model="searchValue">

    <button class="btn-search" type="submit" @click="onClick">Найти
      
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
// import Wrapper from "./Wrapper";

export default {
  
  data: () => ({
    // imgCatalog: './placeholder_200x150.png',
    // связываем input в шаблоне с переменной "userSearch"
    searchValue: '', // перенёс в header
    // userSearch: '',
  }),

  methods: {
    // Для передачи аргументов создадим fun "onClick"
    onClick() {
      // $emit - отлавливаем 'filter-products' с 'App.vue'
      // this.$emit('filter-products', this.userSearch)
      // вызываем родительский метод:
      // this.$emit('filter-products', this.userSearch)
      this.$emit('filter-products', this.searchValue)
    }
    // ProductsList,
    // Wrapper,
  },

  // из "App.vue"
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

<!--<style scoped>-->

<!--</style>-->