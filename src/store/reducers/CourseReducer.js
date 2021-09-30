import * as types from "../actions/actionTypes"
const initialState = { courses: [] }

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_COURSES_SUCESS:
      return {
        ...state,
        courses: action.payload,
      }
    case types.CREATE_COURSE_SUCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      }
    case types.DELETE_COUSE_OPTIMISTIC:
      return {
        ...state,
        courses: state.courses.filter(
          course => course.id !== action.payload.id
        ),
      }

    case types.UPDATE_COURSE_SUCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? action.payload : course
        ),
      }
    default:
      return state
  }
}
export default courseReducer
