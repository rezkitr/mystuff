import Layout from "./Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { remove, setSelected } from "../../redux/slices/stuffSlice";
import { closeModal } from "../../redux/slices/modalSlice";

const DeleteConfirm = () => {
    const dispatch = useDispatch();
    const selectedStuff = useSelector((state) => state.stuff.selectedStuff);

    const onClose = () => {
        dispatch(setSelected(null));
        dispatch(closeModal());
    };

    const onDelete = () => {
        dispatch(remove(selectedStuff.id));
        onClose();
        toast("Stuff deleted successfully", {
            autoClose: 2000,
            type: "success",
        });
    };

    return (
        <Layout
            title="Delete Stuff"
            confirmText="Yes"
            onClose={onClose}
            onSubmit={onDelete}
        >
            <div className="w-96 text-center">
                <h5 className="text-base">
                    Are you sure want to delete this stuff?
                </h5>
            </div>
        </Layout>
    );
};

export default DeleteConfirm;
