import { useState, useEffect } from "react";

function BaseConverter() {
  const [fnumber, setFnumber] = useState("");
  const [cbase, setCbase] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("https://backend-system-um4y.onrender.com/api/conversions")
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((err) => console.error(err));
  }, []);

  function convertBase(num, base) {
    let res = "";
    if (base !== 16) {
      while (num > 0) {
        let r = num % base;
        res = r + res;
        num = Math.floor(num / base);
      }
    } else {
      while (num > 0) {
        let r = num % base;
        if (r === 10) res = "A" + res;
        else if (r === 11) res = "B" + res;
        else if (r === 12) res = "C" + res;
        else if (r === 13) res = "D" + res;
        else if (r === 14) res = "E" + res;
        else if (r === 15) res = "F" + res;
        else res = r + res;
        num = Math.floor(num / base);
      }
    }
    return res === "" ? "0" : res;
  }

  function handleConversion() {
    if (fnumber !== "" && cbase !== "") {
      let num = Number(fnumber);
      let base = Number(cbase);
      let res = convertBase(num, base);

      const newConv = {
        number: fnumber,
        base: cbase,
        result: res,
      };

   
      fetch("https://backend-system-um4y.onrender.com/api/conversions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConv),
      })
        .then((res) => res.json())
        .then((data) => {
          setResult([...result, data]);
          setFnumber("");
          setCbase("");
        })
        .catch((err) => console.error(err));
    }
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this conversion?")) {
      fetch(`https://backend-system-um4y.onrender.com/api/conversions/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete");
          }
          return res.json();
        })
        .then(() => {
          setResult(result.filter((item) => item._id !== id));
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="container text-center mt-4">
      <h1 className="text-primary">Base Converter</h1>
      <div className="card p-3 shadow-sm">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter the number..."
          value={fnumber}
          onChange={(e) => setFnumber(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter the base..."
          value={cbase}
          onChange={(e) => setCbase(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleConversion}>
          Convert Base
        </button>
      </div>

      <div className="mt-3">
        {result.length > 0 ? (
          result.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light"
            >
              <span>
                {item.number} → base {item.base} = {item.result}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted">No conversions yet. Try adding one!</p>
        )}
      </div>
    </div>
  );
}

export default BaseConverter;
