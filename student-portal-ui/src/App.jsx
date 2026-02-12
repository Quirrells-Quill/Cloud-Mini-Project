import { useState } from "react";
import AddStudent from "./AddStudent";
import StudentDetails from "./StudentDetails";
import CourseAdmin from "./CourseAdmin";
import "./App.css";

function App() {
  const [page, setPage] = useState("add");

  return (
    <div>
      <div className="navbar">
        <button onClick={() => setPage("add")}>Add Student</button>
        <button onClick={() => setPage("fetch")}>Fetch Details</button>
        <button onClick={() => setPage("admin")}>Course Admin</button>
      </div>

      {page === "add" && <AddStudent />}
      {page === "fetch" && <StudentDetails />}
      {page === "admin" && <CourseAdmin />}
    </div>
  );
}

export default App;
