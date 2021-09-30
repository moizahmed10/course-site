import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"

export const loadCoursesSucess = courses => {
  return {
    type: types.LOAD_COURSES_SUCESS,
    payload: courses,
  }
}

export const createCourseSucess = course => {
  return {
    type: types.CREATE_COURSE_SUCESS,
    payload: course,
  }
}

export const updateCourseSucess = course => {
  return {
    type: types.UPDATE_COURSE_SUCESS,
    payload: course,
  }
}

export const deleteCourseOptimistic = course => {
  return {
    type: types.DELETE_COUSE_OPTIMISTIC,
    payload: course,
  }
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSucess(courses))
      })
      .catch(error => {
        throw error
      })
  }
}

export function saveCourses(course) {
  return function (dispatch) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSucess(savedCourse))
          : dispatch(createCourseSucess(savedCourse))
      })
      .catch(error => {
        throw error
      })
  }
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course))
    return courseApi.deleteCourse(course.id)
  }
}
