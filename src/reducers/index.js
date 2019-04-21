import { combineReducers } from "redux";
import mainReducer from './main';

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// COMBINE REDUCERS
// If the apps needs chance, this will allow for 
// future changes with ease.
// eg. we may need to add a Auth reducer 
// or a score board reducer
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

export default combineReducers({
    main: mainReducer
});