import { createSlice } from '@reduxjs/toolkit';

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    data: null
  },
  reducers: {
    add_collection: (state, action) => {
      state.data = action.payload;
    },
    clear_collection: (state, action) => {
      state.data = null;
    },
    push_new_collection: (state, action) => {
      if (state.data && state.data.length > 0) {
        state.data = [
          {
            ...action.payload,
            task: []
          },
          ...state.data
        ]
      }
      else {
        state.data = [{
          ...action.payload,
          task: []
        }];
      }

    },
    delete_collection: (state, action) => {
        state.data = state.data.filter((col)=> col.id !== action.payload.collectionId);
    },
    push_new_task: (state, action) => {
      const index = state.data.findIndex((col) => col.id === action.payload.collectionId);
      if (index >= 0) {
        state.data[index].task = [...state.data[index].task, action.payload]
      }
    },
    complete_task: (state, action) => {
      const index = state.data.findIndex((col) => col.id === action.payload.collectionId);
      const taskIndex = state.data[index].task.findIndex((task) => task.id === action.payload.id);
      if (index >= 0 && taskIndex >= 0) {
        state.data[index].task[taskIndex] = {
          ...state.data[index].task[taskIndex],
          isCompleted: true

        }
      }
    },
    uncomplete_task: (state, action) => {
      const index = state.data.findIndex((col) => col.id === action.payload.collectionId);
      const taskIndex = state.data[index].task.findIndex((task) => task.id === action.payload.id);
      if (index >= 0 && taskIndex >= 0) {
        state.data[index].task[taskIndex] = {
          ...state.data[index].task[taskIndex],
          isCompleted: false

        }
      }
    },
    delete_task: (state, action) => {
      const index = state.data.findIndex((col) => col.id === action.payload.collectionId);
      if (index >= 0) {
        state.data[index].task = state.data[index].task.filter((task)=> task.id !== action.payload.id);
      }
    },
    update_task: (state, action) => {
      const index = state.data.findIndex((col) => col.id === action.payload.collectionId);
      const taskIndex = state.data[index].task.findIndex((task) => task.id === action.payload.id);
      if (index >= 0 && taskIndex >= 0) {
        state.data[index].task[taskIndex] = {
          ...state.data[index].task[taskIndex],
          name: action.payload.name
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { delete_collection,update_task ,delete_task,uncomplete_task ,complete_task, push_new_task, add_collection, clear_collection, push_new_collection } = collectionSlice.actions

export default collectionSlice.reducer;
