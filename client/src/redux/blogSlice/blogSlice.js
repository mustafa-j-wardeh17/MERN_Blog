import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    loggendId: '',
    createMode: false
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
        SetCreateMode: (state, action) => {
            state.isAuth = action.payload
        },

    }
});

export const { SetIsAuth, SetLoggendId, SetCreateMode } = blogSlice.actions;

export default blogSlice.reducer;