import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    posts: [],
    totalPosts: 0,
};

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async ({ page, pageSize, sortBy }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5050/posts?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Errore nel caricamento dei post:", error);
            return rejectWithValue(error);
        }
    }
);


const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
                state.totalPosts = action.payload.count; // assuming 'count' is the total number of posts
            })
            .addCase(getPosts.rejected, (state) => {
                state.isLoading = false;
                state.error = "Impossibile ricevere il post";
            });
    },
});

export const postResponse = (state) => state.postsState.response;
export const postsLoading = (state) => state.postsState.isLoading;
export const postsArray = (state) => state.postsState.posts;
export const totalPostsCount = (state) => state.postsState.totalPosts; // export the total posts count

export default postsSlice.reducer;
