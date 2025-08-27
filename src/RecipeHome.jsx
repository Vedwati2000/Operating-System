
// import { useState, useEffect } from "react";

// function RecipeHome() {
//   const [recipeName, setRecipeName] = useState("");
//   const [recipePrice, setRecipePrice] = useState("");
//   const [recipeImage, setRecipeImage] = useState("");
//   const [recipeList, setRecipeList] = useState([]);

 
//   useEffect(() => {
//     fetch("http://localhost:3000/api/recipes")
//       .then((res) => res.json())
//       .then((data) => setRecipeList(data))
//       .catch((err) => console.error(err));
//   }, []);

//   function handleAddRecipe() {
//     if (recipeName && recipePrice && recipeImage) {
//       const newRecipe = {
//         name: recipeName,
//         price: recipePrice,
//         image: recipeImage,
//       };

//       fetch("http://localhost:3000/api/recipes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newRecipe),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setRecipeList([...recipeList, data]); // update frontend list
//           setRecipeName("");
//           setRecipePrice("");
//           setRecipeImage("");
//         })
//         .catch((err) => console.error(err));
//     }
//   }


//   function handleDelete(id) {
//     fetch(`http://localhost:3000/api/recipes/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setRecipeList(recipeList.filter((recipe) => recipe._id !== id));
//       })
//       .catch((err) => console.error(err));
//   }

//   function handleEdit(recipe) {
//     setRecipeName(recipe.name);
//     setRecipePrice(recipe.price);
//     setRecipeImage(recipe.image);
//     handleDelete(recipe._id); 
//   }

//   return (
//     <div className="container text-center mt-4">
//       <h1 className="text-primary">Recipe Home Page</h1>

//       <div className="card p-3 shadow-sm">
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Enter recipe name..."
//           value={recipeName}
//           onChange={(e) => setRecipeName(e.target.value)}
//         />
//         <input
//           type="number"
//           className="form-control mb-2"
//           placeholder="Enter your price..."
//           value={recipePrice}
//           onChange={(e) => setRecipePrice(e.target.value)}
//         />
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Enter image URL..."
//           value={recipeImage}
//           onChange={(e) => setRecipeImage(e.target.value)}
//         />
//         <button
//           className="btn btn-success w-100"
//           onClick={handleAddRecipe}
//         >
//           Add Recipe
//         </button>
//       </div>

     
//       <div className="mt-3">
//         {recipeList.length > 0 ? (
//           recipeList.map((recipe) => (
//             <div
//               key={recipe._id}
//               className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light"
//             >
//               <div className="d-flex align-items-center">
//                 {recipe.image && (
//                   <img
//                     src={recipe.image}
//                     alt={recipe.name}
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       marginRight: "10px",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 )}
//                 <span>
//                   {recipe.name} - ₹{recipe.price}
//                 </span>
//               </div>
//               <div>
//                 <button
//                   className="btn btn-warning btn-sm me-2"
//                   onClick={() => handleEdit(recipe)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(recipe._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-muted">No recipes found. Please add one!</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RecipeHome;











import { useState, useEffect } from "react";

function RecipeHome() {
  const [recipeName, setRecipeName] = useState("");
  const [recipePrice, setRecipePrice] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchRecipes = () => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipeList(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  function handleAddRecipe() {
    if (recipeName && recipePrice && recipeImage) {
      const newRecipe = {
        name: recipeName,
        price: recipePrice,
        image: recipeImage,
      };

      if (editId) {
        fetch(`http://localhost:3000/api/recipes/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecipe),
        })
          .then((res) => res.json())
          .then(() => {
            fetchRecipes();
            setRecipeName("");
            setRecipePrice("");
            setRecipeImage("");
            setEditId(null);
          })
          .catch((err) => console.error(err));
      } else {
        fetch("http://localhost:3000/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecipe),
        })
          .then((res) => res.json())
          .then(() => {
            fetchRecipes();
            setRecipeName("");
            setRecipePrice("");
            setRecipeImage("");
          })
          .catch((err) => console.error(err));
      }
    }
  }


  function handleDelete(id) {
    fetch(`http://localhost:3000/api/recipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setRecipeList(recipeList.filter((recipe) => recipe._id !== id));
      })
      .catch((err) => console.error(err));
  }


  function handleEdit(recipe) {
    setRecipeName(recipe.name);
    setRecipePrice(recipe.price);
    setRecipeImage(recipe.image);
    setEditId(recipe._id);
  }

  return (
    <div className="container text-center mt-4">
      <h1 className="text-primary">Recipe Home Page</h1>

      <div className="card p-3 shadow-sm">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter recipe name..."
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter your price..."
          value={recipePrice}
          onChange={(e) => setRecipePrice(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter image URL..."
          value={recipeImage}
          onChange={(e) => setRecipeImage(e.target.value)}
        />
        <button
          className={`btn ${editId ? "btn-warning" : "btn-success"} w-100`}
          onClick={handleAddRecipe}
        >
          {editId ? "Update Recipe" : "Add Recipe"}
        </button>
      </div>

      <div className="mt-3">
        {recipeList.length > 0 ? (
          recipeList.map((recipe) => (
            <div
              key={recipe._id}
              className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light"
            >
              <div className="d-flex align-items-center">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <span>
                  {recipe.name} - ₹{recipe.price}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(recipe)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No recipes found. Please add one!</p>
        )}
      </div>
    </div>
  );
}

export default RecipeHome;
