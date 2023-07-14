import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: "abc",
        image: "",
        name: "Ayam Kriuk",
        buyPrice: 1000,
        sellPrice: 1000,
        stock: 10,
    },
];

export const stuffSlice = createSlice({
    name: "stuff",
    initialState,
    reducers: {
        add: (state, action) => {
            state = state.push(action.payload);
        },
        remove: (state, action) => {
            return state.filter((stuff) => stuff.id !== action.payload);
        },
    },
});

export const { add, remove } = stuffSlice.actions;
export default stuffSlice.reducer;
