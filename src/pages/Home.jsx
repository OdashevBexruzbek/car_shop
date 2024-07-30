import React from "react";
// custom hooks
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";

// react redux
import { useSelector } from "react-redux";

// react icons
import { BsTrashFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";

// rrd imports
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const { deleteItem } = useFirestore();
  const { user } = useSelector((state) => state.user);
  const { data: recipes } = useCollection(
    "recipes",
    ["uid", "==", user?.uid],
    ["createdAt"]
  );

  

  return (
    <div className="relative min-h-screen p-4">
      {/* "Create recipe" button positioned at the top */}
      <div className="mb-6 flex justify-center">
        <Link
          to="recipes"
          className="btn btn-info text-white bg-blue-500 hover:bg-blue-600 border-none px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlusCircle />
          Create Car for Shop
        </Link>
      </div>
      <div className="flex flex-wrap gap-10 justify-center">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              onClick={() => handleCardClick(recipe.id)}
              key={recipe.id}
              className="card bg-base-100 w-full sm:w-96 h-full pt-7 shadow-xl relative hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <BsTrashFill
                style={{ position: "absolute", top: "6px", right: "6px" }}
                className="text-red-600 cursor-pointer hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(recipe.id);
                }}
              />
              <figure>
                <img
                  className="w-full h-48 object-cover border rounded-lg"
                  src={
                    recipe.images && recipe.images.length > 0
                      ? recipe.images[0]
                      : "https://via.placeholder.com/400x300?text=No+Image+Available"
                  }
                  alt={recipe.title}
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-semibold mb-2">
                  {recipe.title}
                  <div className="badge badge-secondary ml-2">NEW</div>
                </h2>
                <p className="text-gray-700 mb-2">
                  
                  {recipe.description.length > 30 ? (
                    recipe.description
                  ) : (
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 p-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Siz hali ham mashina sotmadingizmi?
            </h2>
            
            <button
              className="btn btn-info text-white bg-blue-500 hover:bg-blue-600 border-none px-6 py-2 rounded-lg"
              onClick={() => navigate("/recipes")}
            >
              Car create shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
