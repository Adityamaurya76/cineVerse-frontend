import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const fetchMovies = createAsyncThunk("movies/fetchMovies",
   async (type, { rejectWithValue }) => {
      try {
         const { data } = await api.get(`/movie/list?type=${type}`);

         return data;
      } catch (error) {
         console.error("Error fetching movie data:", error);
         return rejectWithValue(error.response.data?.message || "Failed to get data");
      }
   }
);

export const fetchMovieDetails = createAsyncThunk("movies/details",
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await api.get(`/movie/details/${id}`);

         return data;
      } catch (error) {
         console.error("Error fetching movie data:", error);
         return rejectWithValue(error.response.data?.message || "Failed to get data");
      }
   }
);

const movieSlice = createSlice({
   name: "movie",
   initialState: {
      loading: false,
      error: null,
      data: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   }
})

export default movieSlice.reducer;