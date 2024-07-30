// react redux
import { useDispatch, useSelector } from "react-redux";

// rrd import
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// pages
import {
  Home,
  About,
  Contact,
  Login,
  Register,
  CreateRecipe,
  RecipeDetail,
} from "./pages";

// style
import "./App.css";

// actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as RecipeAction } from "./pages/CreateRecipe";

// layout
import MainLayout from "./layout/MainLayout";

// react imports
import { useEffect } from "react";

// components
import { ProtectedRoutes } from "./components";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// Redux Slices
import { isAuthChange, login } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "recipes",
          element: <CreateRecipe />,
          action: RecipeAction,
        },
        {
          path: "recipe/:id",
          element: <RecipeDetail />,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return (
    <>{isAuthReady && <RouterProvider router={routes}></RouterProvider>}</>
  );
}

export default App;
