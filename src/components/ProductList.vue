<template>
  <div>
    <div class="columns is-3">
      <div class="column">
        <div class="control has-icons-left">
          <input
            class="input is-normal"
            type="search"
            placeholder="Tag search"
            @keyup="debounce(findByTag($event), 3000)"
          />
          <span class="icon is-medium is-left">
            <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div class="column">
        <div class="control">
          <span class="base-align">Sort by: </span>
          <div class="select">
            <select name="SortType" @change="onChange($event)">
              <option>Comments</option>
              <option>Likes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tagsArray.length < 1">
      <div class="row columns is-multiline">
        <div
          v-for="productItem in productItems"
          :key="productItem.id"
          class="column is-3 product-list--item"
        >
          <ProductListItem :productItem="productItem" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row columns is-multiline">
        <div
          v-for="productItem in tagsArray"
          :key="productItem.id"
          class="column is-3 product-list--item"
        >
          <ProductListItem :productItem="productItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductListItem from "./ProductListItem";

export default {
  name: "ProductList",
  data() {
    return {
      sortBy: null,
      tagsArray: [],
    };
  },
  methods: {
    onChange(event) {
      let sortType = event.target.value === "Comments" ? "comments" : "likes";
      if (this.sortBy !== sortType) {
        this.sort(sortType);
      }
    },
    sort(sortType) {
      this.sortBy = sortType;
      if(this.tagsArray.length < 1) {
        return this.productItems.sort((a, b) => {
        return b[sortType] - a[sortType];
      })
      } else {
      return this.tagsArray.sort((a, b) => {
        return b[sortType] - a[sortType];
      })
      }
    },
    debounce(fn, delay) {
      var timeoutID = null;
      return function() {
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function() {
          fn.apply(that, args);
        }, delay);
      };
    },
    findByTag(event) {
      const searchTag = event.target.value;
      let filterMassive = [...this.productItems];
      filterMassive = this.productItems.filter((el) => {
        let tags = el.tags.split(",").map(item => item.trim());        
        if (tags.includes(searchTag)) {
          return el;
        }
      });
      this.tagsArray = filterMassive;    
    },
  },
  computed: {
    ...mapGetters(["productItems"]),
  },
  created() {
    this.$store.dispatch("getProductItems");
    this.tagsArray = [];
  },
  components: {
    ProductListItem,
  },
};
</script>

<style scoped>
.base-align {
  line-height: 2.1rem;
}
.product-list {
  padding-top: 10px;
}
.product-list--item {
  padding: 10px;
}
</style>
