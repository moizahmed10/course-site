import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { useSelector, useDispatch } from "react-redux"
import { loadCourses } from "../store/actions/courseActions"
import { loadAuthors } from "../store/actions/AuthorAuction"
import { saveCourses } from "../store/actions/CourseActions"
import { Link, navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ManageCourses = ({ location }) => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courseReducer.courses)
  const authors = useSelector(state => state.authorReducer.authors)
  const [saving, setSaving] = useState(false)

  const [newCourse, setnewCourse] = useState({
    id: null,
    title: location?.state.course?.title ? location?.state.course?.title : "",
    authorId: null,
    category: location?.state.course?.category
      ? location?.state.course?.category
      : "",
  })

  useEffect(() => {
    dispatch(loadAuthors())
    dispatch(loadCourses())
  }, [])

  useEffect(() => {
    const updateCourse = location.state?.course
    if (updateCourse !== undefined) {
      delete updateCourse["authorName"]
    }
    setnewCourse({
      ...updateCourse,
    })
  }, [])

  const handleState = e => {
    setnewCourse({
      ...newCourse,
      [e.target.id]: e.target.value,
    })
  }

  const handleSelect = e => {
    if (e.target.value !== "default") {
      let authorId = authors.filter(author => e.target.value === author.name)
      setnewCourse({
        ...newCourse,
        authorId: authorId[0].id,
      })
    }
  }

  const handleClick = e => {
    setSaving(true)
    if (newCourse.authorId === null) {
      alert("Kindly Select An Author and Retry")
    } else {
      dispatch(saveCourses(newCourse)).then(() => {
        location.state.course
          ? toast.success("Course Update Sucessfully")
          : toast.success(" Course Added Sucessfully")
        navigate("/")
      })
    }
  }

  return (
    <Layout>
      <h1>Manage Course</h1>
      <Link to="/">All Courses</Link>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Title</label>
        <input
          id="title"
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          style={{ marginBottom: "20px" }}
          onChange={handleState}
        ></input>

        <label>Author</label>
        <select style={{ marginBottom: "20px" }} onChange={handleSelect}>
          <option
            style={{ color: "#8e8e8e" }}
            value={
              location.state.course
                ? location.state.course.authorName
                : "default"
            }
          >
            {location.state.course
              ? location.state.course.authorName
              : "Choose an Author"}
          </option>
          {authors?.map(author => {
            return (
              <option style={{ color: "black" }} value={author.name}>
                {author.name}
              </option>
            )
          })}
        </select>
        <label>Category</label>
        <input
          id="category"
          type="text"
          style={{ marginBottom: "20px" }}
          placeholder="Course Category"
          value={newCourse.category}
          onChange={handleState}
        ></input>
        <div>
          {location.state.course ? (
            <button
              disabled={saving}
              style={{ width: "100px" }}
              onClick={handleClick}
            >
              {saving === true ? "Updating" : "Update"}
            </button>
          ) : (
            <button
              disabled={saving}
              style={{ width: "100px" }}
              onClick={handleClick}
            >
              {saving === true ? "Adding" : "Add"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default ManageCourses
