<!-- movie searched bar component-->
<template>
  <div class="SearchBody">
    <label>Movie title</label>
    <div class="searchInput">
      <i class="fas fa-search"></i>
      <input
        type="text"
        @keyup.enter="searchMovie"
        v-model="title"
        name="title"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      title: ""
    };
  },
  computed: {
    //gets the state properties that are needed
    ...mapGetters(["movieTitle", "firstSearch"])
  },
  methods: {
    //gets the movie method for fetching movies with API
    ...mapActions(["fetchMovie"]),
    //search for movie
    searchMovie() {
      if (this.title != "") {
        this.$store.commit("movieTitle", this.title);
        this.fetchMovie();
      }
    }
  }
};
</script>

<style scoped>
.SearchBody {
  width: auto;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  padding: 15px;
  margin-bottom: 30px;
}
.SearchBodyActive {
  display: block;
}
.SearchBody label {
  margin-bottom: 12px;
  font-size: 18px;
}
.searchInput {
  height: 45px;
  width: auto;
  border: 1px solid #acb5bd;
  display: flex;
  padding: 0px 7px;
  align-items: center;
  font-size: 20px;
}
.searchInput:focus-within {
  border-color: #030113;
}
.searchInput input {
  height: 85%;
  border: none;
  outline: none;
  width: -webkit-fill-available;
  margin-left: 5px;
  padding-left: 5px;
  font-size: 18px;
}
.searchInput .fa-search {
  color: #acb5bd;
}
</style>
