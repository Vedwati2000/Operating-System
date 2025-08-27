import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignupPage from "./SignupPage";
import RecipeHome from "./RecipeHome";
import BaseConverter from "./BaseConverter";
import ChatBot from "./ChatBot";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div
        className="d-flex flex-column"
        style={{
          minHeight: "100vh",
          minWidth:"100vw",
          background: "linear-gradient(to right, #283048, #859398)",
        }}
      >
        <div className="flex-grow-1 d-flex justify-content-center align-items-center p-3">
          <div className="card shadow-lg bg-light w-100" 
               style={{ maxWidth: "900px", minHeight: "60%" }}>
            <div className="card-body">
              <Routes>
                <Route path="/loginpage" element={<LoginPage />} />
                <Route path="/signuppage" element={<SignupPage />} />
                <Route path="/recipepage" element={<RecipeHome />} />
                <Route path="/baseconverter" element={<BaseConverter />} />
                <Route path="/chatbot" element={<ChatBot />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-dark bg-dark p-2 mt-auto">
          <div className="container-fluid">
            <div className="row w-100 text-center">
              <div className="col-6 col-sm-4 col-md">
                <Link className="btn btn-outline-light w-100 mb-2" to="/loginpage">🔑 Login</Link>
              </div>
              <div className="col-6 col-sm-4 col-md">
                <Link className="btn btn-outline-light w-100 mb-2" to="/signuppage">📝 Signup</Link>
              </div>
              <div className="col-6 col-sm-4 col-md">
                <Link className="btn btn-outline-light w-100 mb-2" to="/recipepage">🍲 Recipe</Link>
              </div>
              <div className="col-6 col-sm-4 col-md">
                <Link className="btn btn-outline-light w-100 mb-2" to="/baseconverter">🔢 Converter</Link>
              </div>
              <div className="col-6 col-sm-4 col-md">
                <Link className="btn btn-outline-light w-100 mb-2" to="/chatbot">🤖 ChatBot</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
