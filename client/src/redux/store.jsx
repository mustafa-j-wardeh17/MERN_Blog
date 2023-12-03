import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './blogSlice/blogSlice'


export const store = configureStore({
    reducer: {
        blog: blogSlice
    }
})