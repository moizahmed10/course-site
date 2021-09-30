import * as types from "../actions/actionTypes"
const initialState = { authors: [] }

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCESS:
      return {
        ...state,
        authors: action.payload,
      }
    default:
      return state
  }
}
export default authorReducer
