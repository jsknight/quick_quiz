import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "../reducers";

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// CREATE REDUX STORE
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////


const resetLoading = store => next => action => { 
    /*
        Intercept Redux Actions and perform middleware functions here if needed.
        
        if(action.type == 'FETCH_QUESTIONS'){
            Do something with code here
        }

    */
    next(action);
}

const enhancer = compose(
    applyMiddleware(thunk, resetLoading),
);

export default function configureStore(){
    const store = createStore(reducer, enhancer);
    return store;
}
  
  