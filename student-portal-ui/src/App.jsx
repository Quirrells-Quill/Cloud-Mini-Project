import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    department: ""
  });

  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const timestamp = () =>
    new Date().toLocaleTimeString();

  const logMessage = (msg) => {
    setLogs(prev => [...prev, `${timestamp()} — ${msg}`]);
  };

  const addStudent = async () => {
    setLogs([]);
    setResult(null);
    logMessage("Adding student to Student Service");

    await fetch("http://localhost:8081/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });

    logMessage("Student added successfully");
  };

  const fetchDetails = async () => {
    setLogs([]);
    setResult(null);
    setLoading(true);

    logMessage("Fetching student details via Student Service");
    logMessage("Calling Course Service with retry enabled");

    // Simulated retry progress (UI explanation)
    setTimeout(() => logMessage("Retrying request (1/3)"), 700);
    setTimeout(() => logMessage("Retrying request (2/3)"), 1400);
    setTimeout(() => logMessage("Retrying request (3/3)"), 2100);

    try {
      const res = await fetch(
        `http://localhost:8081/students/${student.studentId}`
      );
      const data = await res.json();
      setResult(data);

      if (
        typeof data.course === "string" &&
        data.course.includes("unavailable")
      ) {
        logMessage(
          "Student Service retried 3 times and returned fallback response"
        );
      } else {
        logMessage("Student and Course details fetched successfully");
      }

    } catch (err) {
      logMessage("Error fetching details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>University Student Portal</h1>

      <input
        placeholder="Student ID"
        onChange={e =>
          setStudent({ ...student, studentId: e.target.value })
        }
      />
      <input
        placeholder="Student Name"
        onChange={e =>
          setStudent({ ...student, name: e.target.value })
        }
      />
      <input
        placeholder="Department"
        onChange={e =>
          setStudent({ ...student, department: e.target.value })
        }
      />

      <button onClick={addStudent}>Add Student</button>
      <button onClick={fetchDetails}>Fetch Student Details</button>

      <div className="status">
        <h3>Status</h3>
        {logs.map((log, i) => (
          <div key={i} className="log">{log}</div>
        ))}
        {loading && <div className="log loading">Processing...</div>}
      </div>

      {result && (
        <div className="card">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
