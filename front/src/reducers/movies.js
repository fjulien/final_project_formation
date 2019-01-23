let initState = []

const movies = (state = initState, action) => {
  switch (action.type) {
    case 'MOVIES_FIND':
      return action.resultMovie;

    default:
      return state;
  }
}
export default movies;