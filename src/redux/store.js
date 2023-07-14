import { configureStore } from "@reduxjs/toolkit";
import stuffReducer from "./slices/stuffSlice";
import modalReducer from "./slices/modalSlice";

export default configureStore({
    reducer: {
        stuff: stuffReducer,
        modal: modalReducer,
    },
});
