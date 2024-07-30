import React, { useState, useEffect } from "react";
// firebase
import { useCollection } from "../hooks/useCollection";
// rrd imports
import { Form, useActionData, useNavigate } from "react-router-dom";
// redux imports
import { useSelector } from "react-redux";
// components
import { RecipeInput } from "../components";
// custom hooks
import { useFirestore } from "../hooks/useFirestore";


export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let year = formData.get("year");
  let ingredients = formData.getAll("ingredients"); 
  let images = formData.getAll("images"); 
  let description = formData.get("description");
  let category = formData.get("category");
  let price = formData.get("price");

  return { title, year, ingredients, images, description, category, price };
};

function CreateRecipe() {
  const [ingredient, setIngredient] = useState(""); 
  const [ingredientsList, setIngredientsList] = useState([]); 
  const [image, setImage] = useState(""); 
  const [imagesList, setImagesList] = useState([]); 
  const { addNewDoc } = useFirestore(); 
  const userData = useActionData(); 
  const { user } = useSelector((state) => state.user); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userData && user) {
      const newDoc = {
        ...userData,
        uid: user.uid,
        ingredients: ingredientsList, 
        images: imagesList,
      };
      addNewDoc(newDoc);
      navigate("/"); 
    }
  }, [userData]);

  const handleAddIngredient = () => {
    if (ingredient.trim() === "") return; 
    if (ingredientsList.includes(ingredient.trim())) return;

    setIngredientsList((prevList) => [...prevList, ingredient.trim()]);
    setIngredient(""); 
  };

  const handleAddImage = () => {
    if (image.trim() === "") return;
    if (imagesList.length >= 4) return; 
    if (imagesList.includes(image.trim())) return;

    setImagesList((prevList) => [...prevList, image.trim()]);
    setImage(""); 
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://i.dailymail.co.uk/1s/2019/09/18/11/18619048-0-image-a-47_1568804037184.jpg")',
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-lg p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
          <h1 className="text-3xl font-extrabold text-primary mb-6 text-center">
            Add New Car for Shop
          </h1>
          <Form method="post" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700"></label>
              <RecipeInput
                name="title"
                type="text"
                label="Enter car name"
                labelText="Car Name"
              />
            </div>
            <div className="flex flex-col space-y-2">
            <RecipeInput
              name="brand"
              type="text"
              label="Example: BMW"
              className="w-full"
              labelText="Car Brand"
            />
            </div>
            <RecipeInput
              name="year"
              type="date"
              label="Year of manufacture of the car"
              className="w-full"
              labelText="Day-month-year"
            />
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Images :
              </label>
              <div className="flex items-end gap-4">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL..."
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={handleAddImage} // Rasm qo'shish
                  className="btn btn-info mt-2"
                >
                  AddPic
                </button>
              </div>
              <div className="mt-2 flex gap-3">
                {imagesList.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                ))}
              </div>
              <input type="hidden" name="images" value={imagesList.join(",")} />
            </div>
            <RecipeInput
              name="price"
              type="number"
              label="Enter car price"
              className="w-full"
              labelText="Price"
            />
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Enter descriptions"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button className="btn btn-warning flex-1">Preview Car</button>
              <button className="btn btn-success flex-1">Add Car</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
