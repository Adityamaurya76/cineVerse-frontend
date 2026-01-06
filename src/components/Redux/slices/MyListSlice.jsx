import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const mylistList = createAsyncThunk("myList/list",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/my-list/list?userId=${userId}`);

            return data;
        } catch (error) {

            return rejectWithValue(error.response.data?.message || "Failed to fetch My List");
        }
    });

export const addVideoToMyList = createAsyncThunk("myList/add",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/my-list/add", params);
            return data;
        } catch (error) {

            return rejectWithValue(error.response.data?.message || "Failed to add video to My List");
        }
    });

export const removeVideoFromMyList = createAsyncThunk("myList/remove",
    async (videoId, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(`/my-list/remove/${videoId}`);
            return data;
        } catch (error) {

            return rejectWithValue(error.response.data?.message || "Failed to remove video from My List");
        }
    });

const myListSlice = createSlice({
    name: "myList",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(mylistList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mylistList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(mylistList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addVideoToMyList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVideoToMyList.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data && state.data.data) {
                    state.data.data.push(action.payload);
                }
            })
            .addCase(addVideoToMyList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeVideoFromMyList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeVideoFromMyList.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data && state.data.data) {
                    state.data.data = state.data.data.filter((item) => item._id !== action.payload.data?._id && item._id !== action.payload._id);
                }
            })
            .addCase(removeVideoFromMyList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { } = myListSlice.actions;
export default myListSlice.reducer;
