import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

if (!API_URL) {
  throw new Error("VITE_BACKEND_API_URL environment variable is required");
}

// Async thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(`${API_URL}/api/users`);
  return res.data.users;
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  const res = await axios.post(`${API_URL}/api/users`, user);
  return res.data.user;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, values }) => {
    const res = await axios.put(`${API_URL}/api/users/${id}`, values);
    return res.data.user;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // create
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // update
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
