export const url ="http://localhost:4000/api/cinewild";

export const moviesSearch = resultMovie => ({
  type: 'MOVIES_FIND',
  resultMovie,
});

//fetch project name
export const fetchMoviesSearch = (word) => {
  return dispatch => {
    fetch(`${url}/movies/find/?word=${word}`)
      .then(res => res.json())
      .then(word => dispatch(moviesSearch(word)))
  }
}