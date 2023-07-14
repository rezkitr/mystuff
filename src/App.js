import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ItemList, PageHeader, StuffForm } from "./components";
import { MODAL_ID } from "./utils/enum";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const showModal = useSelector((state) => state.modal.isShow);
    const modalId = useSelector((state) => state.modal.modalId);
    return (
        <div className="container h-screen py-4 flex flex-col gap-4">
            <PageHeader />
            <ItemList />
            {modalId === MODAL_ID.ADD_FORM && <StuffForm />}
            <ToastContainer />
        </div>
    );
};

export default App;
