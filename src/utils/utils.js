import { toast } from "react-toastify";

export const priceFormat = (value) => {
    const formattedValue = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
    return formattedValue;
};

export const showToast = {
    addSuccess: () =>
        toast("Stuff added successfully", {
            type: "success",
        }),
    updateSuccess: () =>
        toast("Stuff updated successfully", {
            type: "success",
        }),
    deleteSuccess: () =>
        toast("Stuff deleted successfully", {
            type: "success",
        }),
    nameExist: () =>
        toast("Product name already exist", {
            type: "warning",
        }),
};
