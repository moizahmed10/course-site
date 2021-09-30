import React, { useState } from "react"
import { Link } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { deleteCourse } from "../store/actions/CourseActions"
const CourseList = courses => {
  const [localstate, localsetState] = useState(
    useSelector(state => state.courseReducer.courses)
  )
  console.log("Local State", localstate)

  const dispatch = useDispatch()
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.data.length &&
          courses.data.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <a href={"http://pluralsight.com/courses/" + course.slug}>
                    Watch
                  </a>
                </td>
                <td>
                  <Link to="/manageCourse" state={{ course }}>
                    {course.title}
                  </Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(deleteCourse(course))
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default CourseList
