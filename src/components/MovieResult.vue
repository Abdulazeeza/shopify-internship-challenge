<!--Result component for searched movies -->
<template>
  <div class="moviesBody">
    <h3 v-show="!firstSearch">Search for movies you would like to nominate</h3>
    <h3 v-show="firstSearch">Results for "{{ movieTitle }}"</h3>
    <div class="loadingIcon" v-show="searchingMoivie">
      <i class="fa fa-refresh fa-spin"></i>
    </div>
    <h2 v-show="!foundMovie && firstSearch">Not Found</h2>

    <!--contains the movies result that was searched -->
    <div class="moviesContainer">
      <div
        v-show="foundMovie"
        v-for="movie in searchedMovie.Search"
        :key="movie.imdbID"
        class="movie"
      >
        <img :src="movie.Poster" alt="movie poster" />
        <div class="content">
          <div>{{ movie.Title }} ({{ movie.Year }})</div>
          <button
            @click="addMovie(movie.imdbID)"
            :disabled="nominatedIds.includes(`${movie.imdbID}`)"
          >
            Nominate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MovieResult",
  computed: {
    //gets the state properties that are needed
    ...mapGetters([
      "searchedMovie",
      "movieTitle",
      "foundMovie",
      "firstSearch",
      "nominatedMovies",
      "countNominated",
      "nominatedIds",
      "searchingMoivie"
    ])
  },
  methods: {
    //adds a movie to the nominated list of movies
    addMovie(movieId) {
      for (let i = 0; i < this.nominatedMovies.length; i++) {
        if (
          this.nominatedMovies[i].imdbID == movieId &&
          this.nominatedMovies[i].nominated == false &&
          this.countNominated < 5
        ) {
          let movie = this.nominatedMovies;
          movie[i].nominated = true;
          this.$store.commit("nominatedMovies", movie);
          this.$store.commit("incrementNominated");
          this.$store.commit("addNominatedId", movieId);
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
  margin-top: 0;
}
.moviesBody h2 {
  color: hotpink;
}
.moviesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.moviesContainer .movie {
  width: 190px;
  height: auto;
  padding: 15px;
  border: 1px solid #acb5bd;
  margin: 0px 0px 15px 0px;
  text-align: center;
  position: relative;
  display: grid;
}
.moviesContainer .movie img {
  width: 100%;
  height: 290px;
}
.moviesContainer .movie .content {
  margin-top: 15px;
}
.moviesContainer .movie .content button {
  margin-top: 5px;
  cursor: pointer;
}
.loadingIcon {
  text-align: center;
  font-size: 25px;
  color: #acb5bd;
  margin-bottom: 5px;
}
@media (max-width: 1050px) {
  .moviesContainer .movie {
    width: 27%;
  }
}
@media (max-width: 650px) {
  .moviesContainer .movie {
    width: 40%;
    padding: 10px;
  }
  .moviesContainer .movie img {
    height: 170px;
  }
}
@media (max-width: 400px) {
  .moviesContainer .movie {
    width: 40%;
    padding: 5px;
  }
  .moviesContainer .movie img {
    height: 100px;
  }
}
</style>
