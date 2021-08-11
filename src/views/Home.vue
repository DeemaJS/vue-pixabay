<template>
<div class="container">
  <div class="section">
        <div class="columns">
          <div class="column has-text-centered">
            <h2 class="title" style="color: black;">Pixabay Layout Template</h2>
          </div>
        </div>
    <ProductList />
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList'

export default {
  name: 'Home',
  components: {
    ProductList
  }
}
</script>
