import * as types from "./actionTypes"
import * as authorApi from "../../api/authorApi"

export const loadAuthorsSucess = authors => {
  return {
    type: types.LOAD_AUTHORS_SUCESS,
    payload: authors,
  }
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSucess(authors))
      })
      .catch(error => {
        throw error
      })
  }
}
