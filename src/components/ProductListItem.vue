<template>
  <div class="card is-shady">
    <div class="card-image">
      <figure class="image is-16by9">
         <a :href="productItem.pageURL">
        <img :src="productItem.webformatURL" alt="Image" />
        </a>
      </figure>
    </div>
    <div class="card-content">
      <div class="msg-header">
        <p class="title is-6">User: {{ productItem.user }}</p>
      </div>  
        <div class="msg-subject">          
        <div> 
          <span><small>Tags: </small></span>        
          <p class="tag is-rounded is-normal" v-for="(item, index) in tags" :key="index"><small>{{ item }}</small></p>
        </div>
          <p><small>Likes: {{ productItem.likes }}</small></p>
          <p><small>Comments: {{ productItem.comments }}</small></p>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductListItem",
  data(){
    return {
      tags: this.productItem.tags.split(',')
    }
  },
  props: ["productItem"],
  methods: {
    ...mapActions(["addCartItem"]),
  },
};
</script>

<style scoped>
.msg-subject {
  display: flex;
  flex-direction: column;
  padding: .4rem;
}
</style>
