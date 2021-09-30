import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { useSelector, useDispatch } from "react-redux"
import { loadCourses } from "../store/actions/courseActions"
import { loadAuthors } from "../store/actions/AuthorAuction"
import CourseList from "../components/CoursesList"
import { Link } from "gatsby"
import Loader from "../components/Loader"

const IndexPage = () => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courseReducer.courses)
  const authors = useSelector(state => state.authorReducer.authors)
  const [coursesState, setCoursesState] = useState([])

  useEffect(() => {
    dispatch(loadAuthors())
    dispatch(loadCourses())
  }, [])

  useEffect(() => {
    console.log("courses", courses)
    console.log("authors", authors)
    let arr = []
    let obj = {}
    if (courses.length > 0 && authors.length > 0) {
      for (const course of courses) {
        obj = { ...course }
        obj.authorName = authors?.find(a => a.id === course.authorId)?.name
        arr.push(obj)
      }
      setCoursesState(arr)
    }
  }, [courses, authors])

  return (
    <Layout>
      <div>
        <h1>Courses</h1>
        <Link to="/manageCourse">Manage Courses</Link>
        {console.log("TEst", coursesState)}
        {courses.length > 0 && authors.length > 0 ? (
          <CourseList data={coursesState} />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
