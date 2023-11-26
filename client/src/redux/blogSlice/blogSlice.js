import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonstate:false,
    query: '',
    selectedrecommended:'',
    selectedcategory: '',
    selectedprice: '',
    selectedcolor: '',
    dataresult:[]
}

export const blogSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        Setbuttonstate: (state, action) => {
            state.query = action.payload;
        },
        Setquery: (state, action) => {
            state.query = action.payload;
        },
        Setselectedrecommended: (state, action) => {
            state.selectedrecommended = action.payload;
        },        
        Setselectedcategory: (state, action) => {
            state.selectedcategory = action.payload;
        },
        Setselectedprice: (state, action) => {
            state.selectedprice = action.payload;
        },
        Setselectedcolor: (state, action) => {
            state.selectedcolor = action.payload;
        },
        Setdataresult:(state,action)=>{
            state.dataresult=action.payload;
        }
    }
});

export const {Setbuttonstate, Setquery, Setselectedrecommended, Setselectedcategory,Setselectedprice,Setselectedcolor,Setdataresult } = blogSlice.actions;

export default blogSlice.reducer;