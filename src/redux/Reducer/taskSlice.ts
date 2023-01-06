import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Todo {
    id: number;
    title: string;
}

export const getTodos = createAsyncThunk("todoList/getTodos", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/");
    let json = await response.json();
    return json;
  });

const todoSlice = createSlice({
    name: "todo",
    initialState: [
        { id: 1, title: "rửa bát" },
        { id: 2, title: "quét nhà" },
    ],
    reducers: {
        addItem: (state, action: PayloadAction<Todo>) => {
            const newItem: Todo = {
                id: Math.floor(Math.random() * 100),
                title: action.payload.title,
            };
            state.push(newItem);
        },

        deleteItem: (state, action: PayloadAction<Todo>) => {
            return state.filter((item) => item.id !== action.payload.id);
        },

        updateItem: (state, action: PayloadAction<Todo> ) => {
           const updatingTask =  state.filter((item) => item.id === action.payload.id)
           const updatingTaskIndex = state.indexOf(updatingTask[0])
           const updatedTask: Todo = {
                id : updatingTask[0].id,
                title: action.payload.title
           }
           state.splice(updatingTaskIndex ,1, updatedTask)
       }
    },
});

export const { addItem, deleteItem, updateItem } = todoSlice.actions;

export default todoSlice.reducer;
