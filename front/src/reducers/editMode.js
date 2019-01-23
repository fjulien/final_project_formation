let initState = false

const editMode = (state = initState, action) => {
  switch (action.type) {
    case 'EDIT_CHANGE':
      return !state;

    default:
      return state;
  }
}
export default editMode;