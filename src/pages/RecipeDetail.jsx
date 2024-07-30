import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";


function RecipeDetail() {
  const { id } = useParams();
  const { document: recipe } = useDocument("recipes", id);

  if (!recipe) {
    return <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-700 h-10 w-10"></div>
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-700 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-700 rounded col-span-2"></div>
            <div class="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {recipe.images && recipe.images.length > 0 ? (
          recipe.images.map((imageURL, index) => (
            <img
              key={index}
              src={imageURL}
              alt={`Recipe ${index}`}
              className="w-full sm:w-1/2 md:w-1/4 h-48 object-cover border rounded-lg"
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/400x300?text=No+Image+Available"
            alt="No Images Available"
            className="w-full sm:w-1/2 md:w-1/4 h-48 object-cover border rounded-lg"
          />
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Description:</h3>
        <p>{recipe.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="badge badge-primary">{recipe.category}</span>
        <span className="badge badge-secondary">{recipe.price} $</span>
      </div>
    </div>
  );
}

export default RecipeDetail;
