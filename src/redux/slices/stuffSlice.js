import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [
        {
            id: "abc",
            image: "",
            name: "Ayam Kriuk",
            buyPrice: 1000,
            sellPrice: 1000,
            stock: 10,
        },
    ],
    selectedStuff: null,
};

export const stuffSlice = createSlice({
    name: "stuff",
    initialState,
    reducers: {
        add: (state, action) => {
            state.data.push(action.payload);
        },
        remove: (state, action) => {
            const newData = state.data.filter(
                (stuff) => stuff.id !== action.payload
            );
            state.data = newData;
        },
        update: (state, action) => {
            const newData = state.data.map((stuff) => {
                if (stuff.id === action.payload.id) {
                    return { ...stuff, ...action.payload };
                }
                return stuff;
            });
            state.data = newData;
        },
        setSelected: (state, action) => {
            state.selectedStuff = action.payload;
        },
    },
});

export const { add, remove, update, setSelected } = stuffSlice.actions;
export default stuffSlice.reducer;
