import { useState, useEffect } from "react";


function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  async function handleSignup() {
    if (!name || !email || !password || !conPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (password !== conPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const response = await fetch("https://backend-system-um4y.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, conpassword: conPassword })
    });
  
    const data = await response.json();
    setUsers([...users, data]); 
    setName(""); setEmail(""); setPassword(""); setConPassword("");
    alert("Signup successful!");
  }
  

  async function handleDelete(id) {
    await fetch(`https://backend-system-um4y.onrender.com/api/signup/${id}`, { method: "DELETE" });
    setUsers(users.filter(user => user._id !== id)); 
  }
  

  useEffect(() => {
    fetch("https://backend-system-um4y.onrender.com/api/signup")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);
  

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h1 className="text-primary text-center mb-4">Signup Page</h1>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="Enter the name..."
            onChange={(e) => setName(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="email"
            value={email}
            placeholder="Enter the email..."
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            value={password}
            placeholder="Enter the password..."
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            value={conPassword}
            placeholder="Confirm your password..."
            onChange={(e) => setConPassword(e.target.value)}
            className="form-control mb-3"
          />
          <button className="btn btn-success w-100" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-center">Registered Users</h2>
        {users.length === 0 ? (
          <p className="text-center">No users registered yet.</p>
        ) : (
          <table className="table table-bordered table-hover mt-3">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SignupPage;















