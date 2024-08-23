import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    loggendId: '',
    loggedUser: '',
    createMode: false,
    categories: ['computer', 'programming', 'gaming', 'artificial intelligence'],
    postsData: [],
    searchPosts: [],
    searchText: '',
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
        SetPosts: (state, action) => {
            state.postsData = action.payload
        },
        SetSearchText: (state, action) => {
            state.searchText = action.payload
        },
        SetSearchPosts: (state, action) => {
            if (action.payload === '') {
                state.searchPosts = state.postsData
            }
            else {
                state.searchPosts = state.postsData.filter(post => post.title.toLowerCase().includes(action.payload.toLowerCase().trim()))
            }
        }

    }
});

export const { SetIsAuth, SetLoggendId, SetPosts, SetSearchText, SetSearchPosts, SetLoggedUser, SetCreateMode, setCategories } = blogSlice.actions;

export default blogSlice.reducer;