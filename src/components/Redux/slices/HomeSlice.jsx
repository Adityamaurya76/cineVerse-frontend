import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const homeList = createAsyncThunk("home/homeList",
   async(userId, { rejectWithValue }) => {
   try {
         console.log("Fetching home data for userId:", userId);
         const { data } = await api.get(`/home/list?userId=${userId}`);
         console.log("Home data received:", data);
         
         return data;
      } catch (error) {
         console.error("Error fetching home data:", error);
         return rejectWithValue(error.response.data?.message || "Failed to get data");
      }   
   }
);

const homeSlice = createSlice({
   name: "home",
   initialState: {
    loading: false,
    error: null,
    data: null
   },
   reducers: {},
   extraReducers: (builder) => {
     builder
     .addCase(homeList.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(homeList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
     })
     .addCase(homeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     })
   }
})

export default homeSlice.reducer;