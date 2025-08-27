

import { useState, useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/api/login")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);


  function handleLogin() {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.error(err));
  }


  

  function handleDelete(id) {
    fetch(`http://localhost:3000/api/login/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container text-center mt-4">
      <h1 className="text-primary">Login Page</h1>
      <div className="card p-3 shadow-sm">
        <input
          type="text"
          value={name}
          className="form-control mb-2"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          className="form-control mb-2"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="form-control mb-2"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-success w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-secondary">Login users</h3>
        {users.map((u) => (
          <div
            key={u._id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light"
          >
            <span>
              {u.name} ({u.email})
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(u._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
