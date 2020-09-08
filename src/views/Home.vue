<template>
  <div class="home">
    <div class="container">
      <SearchBar />
      <div class="resultBody">
        <div class="result">
          <Nomination />
        </div>
        <div class="result">
          <MovieResult />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar";
import MovieResult from "@/components/MovieResult";
import Nomination from "@/components/Nomination";
//import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
    MovieResult,
    Nomination
  }
};
</script>

<style scoped>
.container {
  width: 1000px;
  padding: 30px 0px;
  margin: 30px auto;
}
.result {
  width: 100%;
  display: grid;
}
@media (max-width: 1050px) {
  .container {
    width: 90%;
  }
}
</style>
