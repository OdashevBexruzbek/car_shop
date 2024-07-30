import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  completed: 0,
  unCompleted: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: () => {},
    removeTodo: () => {},
    changeStatusTodo: () => {},
    calculateTodo: () => {},
  },
});

export const { addTodo, removeTodo, changeStatusTodo, calculateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
