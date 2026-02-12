import { useState } from "react";
const MAX_RETRIES = 3;

function StudentDetails() {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const log = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `${time} — ${msg}`]);
  };

  const fetchDetails = async () => {
  setLogs([]);
  setResult(null);
  let attempt = 0;
  let success = false;

  while (attempt < MAX_RETRIES && !success) {
    try {
      attempt++;
      log(`🔁 Attempting Student Service (${attempt}/${MAX_RETRIES})`);

      const res = await fetch(
        `http://localhost:8081/students/${studentId}`
      );

      if (!res.ok) {
        throw new Error("Student Service error");
      }

      const data = await res.json();
      setResult(data);

      if (
        typeof data.student === "string" &&
        data.student.includes("not found")
      ) {
        log("Student validation failed — fallback triggered");
      } else if (
        typeof data.course === "string" &&
        data.course.includes("unavailable")
      ) {
        log("Course Service unavailable — retry + fallback applied");
      } else {
        log("Student and Course details fetched successfully");
      }

      success = true;

    } catch (err) {
      if (attempt === MAX_RETRIES) {
        log(
          "❌ Student Service unavailable — fallback applied. Course Service unaffected."
        );
      }
    }
  }
};


  return (
    <div className="container">
      <h1>Fetch Student Details</h1>

      <input
        placeholder="Registration Number"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button onClick={fetchDetails}>Fetch Details</button>

      <div className="status">
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      {result && (
        <>
          {typeof result.student === "object" && (
            <div className="card">
              <h3>Student</h3>
              <p>Name: {result.student.name}</p>
              <p>Department: {result.student.department}</p>
            </div>
          )}

          {typeof result.course === "object" && (
            <div className="card">
              <h3>Course</h3>
              <p>{result.course.courseName}</p>
              <p>Credits: {result.course.credits}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StudentDetails;
