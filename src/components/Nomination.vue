<!--contains the list nominations -->
<template>
  <div class="moviesBody">
    <h3>Nominations</h3>
    <h4 v-if="countNominated == 0">You have not nominated any movie yet.</h4>
    <div class="completed" v-else-if="countNominated >= 5">
      You have reached the maximum nominations required
    </div>

    <!--contains each movie that has been nominated -->
    <ul>
      <li
        v-show="movie.nominated"
        v-for="movie in nominatedMovies"
        :key="movie.imdbID"
      >
        {{ movie.Title }} ({{ movie.Year }})
        <button @click="removeMovie(movie.imdbID)" class="del">x</button>
      </li>
    </ul>
    <!-- <button class="btn" v-if="countNominated > 0">Submit</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Nomination",
  computed: {
    //gets the state properties that are needed
    ...mapGetters(["nominatedMovies", "countNominated"])
  },
  methods: {
    //removes a movie from the nominated list of movies
    removeMovie(movieId) {
      for (let i = 0; i < this.nominatedMovies.length; i++) {
        if (
          this.nominatedMovies[i].imdbID == movieId &&
          this.nominatedMovies[i].nominated == true
        ) {
          let movie = this.nominatedMovies;
          movie[i].nominated = false;
          this.$store.commit("nominatedMovies", movie);
          this.$store.commit("decrementNominated");
          this.$store.commit("removeNominatedId", movieId);
        }
      }
    }
  }
};
</script>

<style scoped>
.moviesBody {
  width: auto;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  padding: 15px;
  margin-bottom: 30px;
}
.moviesBody h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 0px;
}
.moviesBody .completed {
  color: #fff;
  background: #4caf50;
  padding: 20px 7px;
  font-size: 20px;
  margin: 10px 0px;
  border-radius: 5px;
  text-align: center;
}
.moviesBody h4 {
  color: hotpink;
}
.moviesBody ul {
  display: flex;
  flex-wrap: wrap;
}
.moviesBody ul li {
  margin-bottom: 15px;
  list-style: none;
  display: flex;
  border-radius: 5px;
  background-color: rgb(239, 239, 239);
  padding: 10px 15px;
  margin-right: 10px;
  align-items: center;
}
.del {
  background: #030113;
  color: #fff;
  border: none;
  padding: 1px 7px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  font-size: 20px;
  margin-left: 7px;
}
.btn {
  background: #030113;
  color: #fff;
  border: none;
  width: 170px;
  height: 40px;
  cursor: pointer;
  margin-right: 40px;
  float: right;
}
@media (max-width: 650px) {
  .moviesBody ul {
    padding-left: 0px;
  }
  .btn {
    float: left;
  }
}
</style>
