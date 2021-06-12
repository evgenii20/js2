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
          <!--        <button @click="onClick(item)">Удалить</button>-->
        </div>
      </div>
<!--    </div>-->
  </div>
  <!--  </div>-->
</template>

<script>
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
  },
  // methods: {
  //   onClick() {
  //     // $emit - отлавливаем 'filter-products' с 'App.vue'
  //     // this.$emit('filter-products', this.userSearch)
  //     // this.$emit('toggle-cart', this.toggleCartStatus)
  //   },
  // },
}
</script>

<style scoped>

</style>