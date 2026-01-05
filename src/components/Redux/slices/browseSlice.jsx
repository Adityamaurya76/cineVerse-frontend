import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const browseList = createAsyncThunk("browse/list",
   async(_, { rejectWithValue }) => {
   try {
        const { data } = await api.get(`/browse/list`);
    
        return data;
      } catch (error) {
        console.error("Error fetching browse data:", error);
        return rejectWithValue(error.response.data?.message || "Failed to get data");
      }   
   }
);

const browseSlice = createSlice({
   name: "browse",
   initialState: {
    loading: false,
    error: null,
    data: null
   },
   reducers: {},
   extraReducers: (builder) => {
     builder
     .addCase(browseList.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(browseList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
     })
     .addCase(browseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     })
    } 
})

export default browseSlice.reducer;