<template>
  <div class="products">
    <!--        <div class="product-item" v-for="product of products" :key="product.id_product">-->
    <!--        <ProductsList :goods="filtered" />-->

    <!--    <div class="product-item" v-for="item in filtered" :key="item.id_product">-->
    <div class="product-item" v-for="item in products" :key="item.id_product">
      <img :src="imgCatalog" alt="Some img">
      <div class="desc">
        <!--            <h3>{{ product.product_name }}</h3>-->
        <Wrapper>
          <h3>{{ item.product_name }}</h3>
<!--          {{console.log(item.product_name)}}-->
        </Wrapper>
        <!--            <p>{{ product.price }}₽</p>-->
        <p>{{ item.price }} руб.</p>
        <button class="buy-btn" @click="onClick(item)">Купить</button>
        <!--        <button class="buy-btn">Купить</button>-->
      </div>
    </div>
  </div>
</template>

<script>
import Wrapper from './Wrapper.vue'

export default {
  // name: 'HelloWorld',
  // отображение данных на странице из модуля ProductsList
  props: {
    // msg: String
    products: {
      type: Array,
      default: () => [],
    }
  },

  data: () => ({
    imgCatalog: './placeholder_200x150.png',

  }),

  components: {
    // ProductsList,
    Wrapper,
  },
  methods: {
  //  выполняем действие с объектом
    onClick(item) {
    //  передаём данные в родительский компонент по отношению к текущему
      this.$emit('add-to-cart', item)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.products {
  column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 1fr;
  padding: 40px 80px;
  justify-content: space-between;
}

.product-item {
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
}
</style>
