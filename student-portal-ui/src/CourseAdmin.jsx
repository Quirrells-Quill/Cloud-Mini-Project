import { useEffect, useState } from "react";

function CourseAdmin() {
  const [course, setCourse] = useState({
    courseId: "",
    courseName: "",
    credits: ""
  });

  const [courses, setCourses] = useState([]);

  // Fetch all courses
  const loadCourses = async () => {
    const res = await fetch("http://localhost:8082/admin/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Add course
  const addCourse = async () => {
    await fetch("http://localhost:8082/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.courseId,
        courseName: course.courseName,
        credits: Number(course.credits)
      })
    });

    setCourse({ courseId: "", courseName: "", credits: "" });
    loadCourses();
  };

  // Delete course
  const deleteCourse = async (id) => {
    await fetch(`http://localhost:8082/admin/courses/${id}`, {
      method: "DELETE"
    });
    loadCourses();
  };

  return (
    <div className="container">
      <h1>Course Admin Dashboard</h1>

      <input
        placeholder="Course ID"
        value={course.courseId}
        onChange={(e) =>
          setCourse({ ...course, courseId: e.target.value })
        }
      />
      <input
        placeholder="Course Name"
        value={course.courseName}
        onChange={(e) =>
          setCourse({ ...course, courseName: e.target.value })
        }
      />
      <input
        placeholder="Credits"
        type="number"
        value={course.credits}
        onChange={(e) =>
          setCourse({ ...course, credits: e.target.value })
        }
      />

      <button onClick={addCourse}>Add Course</button>

      <hr />

      <h3>Available Courses</h3>

      {courses.map((c) => (
        <div key={c.courseId} className="card">
          <p><b>ID:</b> {c.courseId}</p>
          <p><b>Name:</b> {c.courseName}</p>
          <p><b>Credits:</b> {c.credits}</p>
          <button onClick={() => deleteCourse(c.courseId)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CourseAdmin;
