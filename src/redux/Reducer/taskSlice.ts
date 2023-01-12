import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    name: string;
}

const ACCESS_TOKEN = '979439553986c5b18580c0f17554d92b44ef772eea126978670edda6adca7046'  

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
    const response = await fetch(`https://gorest.co.in/public/v2/users/`, {
        method: "GET",
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    })
    return await response.json()
});

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodos",
    async ( id: number ) => {
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
            method: "DELETE",
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        })
        return await response.json()
    }
);

export const addTodo = createAsyncThunk(
    "todo/addTodos",
    async ( task: string) => {
        const RANDOM_EMAIL = `aasdfa${Math.floor(Math.random()*1000)}@gmail.com`

        const response = await fetch(`https://gorest.co.in/public/v2/users`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                name: task,
                // api default infomation
                gender: 'male',
                email: RANDOM_EMAIL,
                status: 'active'
            }),
        }) 
        console.log(response)
        return await response.json()
    }
);

export const updateTodo = createAsyncThunk(
    "todo/addTodos",
    async ( update: { id: number, updatedName: string}) => {
        const {id, updatedName} = update
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                name: updatedName
            }),
        })
        console.log(response)
        return await response.json()
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState: [
        { id: 0, name: "rửa bát" }
    ],
    extraReducers: {
        // GET todo list
        [getTodos.fulfilled.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
          state.splice(0,1, action.payload).flat()
        },
        [getTodos.rejected.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            console.log("fail to get data");
        },

        // DELETE task 
        [deleteTodo.fulfilled.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            let index = state.indexOf(action.payload)
            state.splice(index, 1)
        },
        [deleteTodo.rejected.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            console.log("fail to delete data");
        },

        // ADD task
        [addTodo.fulfilled.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            state = [action.payload]
        },
        [addTodo.rejected.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            console.log("fail to add task");
        },

        // UPDATE task
        [updateTodo.fulfilled.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            state = [action.payload]
        },
        [updateTodo.rejected.toString()]: (
            state,
            action: PayloadAction<Todo>
        ) => {
            console.log("fail to update task");
        }
    },

    reducers: {
        // addItem: (state, action: PayloadAction<Todo>) => {
        //     const newItem: Todo = {
        //         id: Math.floor(Math.random() * 100),
        //         name: action.payload.name,
        //     };
        //     state.push(newItem);
        // },

        // // deleteItem: (state, action: PayloadAction<Todo>) => {
        // //     return state.filter((item) => item.id !== action.payload.id);
        // // },

        // updateItem: (state, action: PayloadAction<Todo>) => {
        //     const updatingTask = state.filter(
        //         (item) => item.id === action.payload.id
        //     );
        //     const updatingTaskIndex = state.indexOf(updatingTask[0]);
        //     const updatedTask: Todo = {
        //         id: updatingTask[0].id,
        //         name: action.payload.name,
        //     };
        //     state.splice(updatingTaskIndex, 1, updatedTask);
        // },
    },
});

// export const {} = todoSlice.actions;

export default todoSlice.reducer;
