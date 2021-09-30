import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import RootReducer from "./reducers/"
const store = createStore(RootReducer, compose(applyMiddleware(thunk)))

export default store
