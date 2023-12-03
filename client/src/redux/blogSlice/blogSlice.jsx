import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    loggendId: '',
    loggedUser: '',
    createMode: false,
    categories: ['computer', 'programming', 'gaming', 'artificial intelligence']
}

export const blogSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        SetIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        SetLoggendId: (state, action) => {
            state.loggendId = action.payload
        },
        SetLoggedUser: (state, action) => {
            state.loggedUser = action.payload
        },
        SetCreateMode: (state, action) => {
            state.isAuth = action.payload
        },
        setCategories: (state, action) => {
            const newArray = state.categories
            newArray.push(action.payload)
            state.categories = newArray
        },

    }
});

export const { SetIsAuth, SetLoggendId, SetLoggedUser, SetCreateMode, setCategories } = blogSlice.actions;

export default blogSlice.reducer;