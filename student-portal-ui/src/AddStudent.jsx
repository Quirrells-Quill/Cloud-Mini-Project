import { useState } from "react";
import { useEffect } from "react";
const MAX_RETRIES = 3;


function AddStudent() {
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    department: "",
    courseId: ""
  });

  const [message, setMessage] = useState("");
    const [courses, setCourses] = useState([]);
    
  const loadCourses = async () => {
  const res = await fetch("http://localhost:8082/admin/courses");
  const data = await res.json();
  setCourses(data);
};

  useEffect(() => {
    loadCourses();
  }, []);

  const addStudent = async () => {
  setMessage("");
  let attempt = 0;
  let success = false;

  if (
    !student.studentId ||
    !student.name ||
    !student.department ||
    !student.courseId
  ) {
    setMessage("⚠️ Please fill all fields");
    return;
  }

  while (attempt < MAX_RETRIES && !success) {
    try {
      attempt++;
      setMessage(`🔁 Attempting to reach Student Service (${attempt}/${MAX_RETRIES})`);

      const res = await fetch("http://localhost:8081/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });

      if (!res.ok) {
        throw new Error("Student Service error");
      }

      success = true;
      setMessage("✅ Student added successfully");
      setStudent({
        studentId: "",
        name: "",
        department: "",
        courseId: ""
      });

    } catch (err) {
      if (attempt === MAX_RETRIES) {
        setMessage(
          "❌ Student Service unavailable. Courses are operational. Please try later."
        );
      }
    }
  }
};


  return (
    <div className="container">
      <h1>Add Student</h1>

      <input
        placeholder="Registration Number"
        value={student.studentId}
        onChange={(e) =>
          setStudent({ ...student, studentId: e.target.value })
        }
      />
      <input
        placeholder="Student Name"
        value={student.name}
        onChange={(e) =>
          setStudent({ ...student, name: e.target.value })
        }
      />
      <input
        placeholder="Department"
        value={student.department}
        onChange={(e) =>
          setStudent({ ...student, department: e.target.value })
        }
      />
        <select
  value={student.courseId}
  onChange={(e) =>
    setStudent({ ...student, courseId: e.target.value })
  }
>
  <option value="">Select Course</option>
  {courses.map((c) => (
    <option key={c.courseId} value={c.courseId}>
      {c.courseName}
    </option>
  ))}
</select>

      {/* Course dropdown will come next */}
      <button onClick={addStudent}>Add Student</button>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default AddStudent;
