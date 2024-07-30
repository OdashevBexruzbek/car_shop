import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import todosReducer from "../features/todosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});
