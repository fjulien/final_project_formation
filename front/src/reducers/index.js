import { combineReducers } from 'redux';
import movies from "./movies";
import editMode from "./editMode";

const allReducers = combineReducers({
  editMode,
  movies,
});

export default allReducers;
