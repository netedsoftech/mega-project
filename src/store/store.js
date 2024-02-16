import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        // todo : add more slices here for a posts
    }
});

export default store