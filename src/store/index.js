import Vue from "vue";
import Vuex from "vuex";
import searchedMovies from "./modules/searchedMovies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    searchedMovies
  }
});
