import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "../reducers";

const resetLoading = store => next => action => { 
    next(action);
}

const enhancer = compose(
    applyMiddleware(thunk, resetLoading),
);


export default function configureStore(){
    const store = createStore(reducer, enhancer);
    return store;
}
  
  