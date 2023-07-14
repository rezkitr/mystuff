import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShow: false,
    modalId: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.isShow = true;
            state.modalId = action.payload;
        },
        closeModal: (state) => {
            state.isShow = false;
            state.modalId = null;
        },
    },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
