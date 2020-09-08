import axios from "axios";

//adds the movies to the nominationMovies to await nominations
const addMovie = movies => {
  let moviesList = [];
  for (let i = 0; i < movies.Search.length; i++) {
    let movie = {};
    let movieId = movies.Search[i].imdbID;
    let movieTitle = movies.Search[i].Title;
    let movieYear = movies.Search[i].Year;

    movie.imdbID = movieId;
    movie.nominated = false;
    movie.Title = movieTitle;
    movie.Year = movieYear;
    moviesList.push(movie);
  }
  return moviesList;
};

/*helps to sort the movies and make sure movies 
that have been nominated initially are known*/
const sortMovies = (oldMovies, movies) => {
  let newMovies = movies;
  for (let i = 0; i < oldMovies.length; i++) {
    for (let j = 0; j < newMovies.length; j++) {
      if (oldMovies.length > 0 && newMovies.length > 0) {
        if (newMovies[j].imdbID == oldMovies[i].imdbID) {
          newMovies.splice(j, j + 1);
        }
      }
    }
  }
  let updatedMovies = oldMovies.concat(newMovies);
  return updatedMovies;
};

//holds all the state properties
const state = {
  nominatedMovies: [{ imdbID: "" }],
  nominatedIds: [],
  searchedMovie: "",
  movieTitle: "",
  foundMovie: false,
  firstSearch: false,
  searchingMoivie: false,
  countNominated: 0,
  buttonState: true
};

//makes the state properties availabe for global use in our components
const getters = {
  searchedMovie: state => state.searchedMovie,
  movieTitle: state => state.movieTitle,
  foundMovie: state => state.foundMovie,
  firstSearch: state => state.firstSearch,
  nominatedMovies: state => state.nominatedMovies,
  countNominated: state => state.countNominated,
  nominatedIds: state => state.nominatedIds,
  searchingMoivie: state => state.searchingMoivie
};

const actions = {
  //helps fetch the movies using REST API
  fetchMovie({ commit }) {
    state.searchingMoivie = true;
    axios
      .get(`http://www.omdbapi.com/?s=${state.movieTitle}&apikey=1ed4a04b`)
      .then(response => response.data)
      .then(movies => {
        state.searchingMoivie = false;
        commit("searchedMovie", movies); //update the searchMovies state with the present response
        state.firstSearch = true;
        let oldMovies, newMovies;

        //check if the response was true and update the state
        if (state.searchedMovie.Response == "True") {
          state.foundMovie = true;
          oldMovies = state.nominatedMovies;
          newMovies = addMovie(movies);
          let updatedMovies = sortMovies(oldMovies, newMovies);
          commit("nominatedMovies", updatedMovies);
        } else {
          state.foundMovie = false;
        }
      });
  }
};

//updates the different state properties
const mutations = {
  searchedMovie: (state, movie) => (state.searchedMovie = movie),
  movieTitle: (state, movieTitle) => (state.movieTitle = movieTitle),
  nominatedMovies: (state, nominatedMovies) =>
    (state.nominatedMovies = nominatedMovies),
  incrementNominated: state => state.countNominated++,
  decrementNominated: state => state.countNominated--,
  removeNominatedId: (state, movieId) => {
    state.nominatedIds = state.nominatedIds.filter(e => e !== movieId);
  },
  addNominatedId: (state, movieId) => {
    state.nominatedIds.push(movieId);
  }
};

export default {
  //export all the listed properties
  state,
  getters,
  actions,
  mutations
};
