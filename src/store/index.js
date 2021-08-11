import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';

export default new Vuex.Store({
  state: {
    productItems: []
  },
  mutations: {
    UPDATE_PRODUCT_ITEMS(state, payload) {
      state.productItems = payload;
    }
  },
  actions: {
    getProductItems({ commit }) {
      axios.get('https://pixabay.com/api/?key=22867408-b03f898fd19251fbda9aae88e&q=cats&image_type=all&per_page=100').then((response) => {
        commit('UPDATE_PRODUCT_ITEMS', response.data.hits)
      });
    }
  },
  getters: {
    productItems: state => state.productItems
  },
  modules: {
  }
})
