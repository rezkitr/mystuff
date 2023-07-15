import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "./Button";
import { showModal } from "../redux/slices/modalSlice";
import { MODAL_ID } from "../utils/enum";

const PageHeader = () => {
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(moment().format("DD MMMM YYYY | HH:mm"));
        }, 1000);
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="px-6 py-4 bg-yellow-300 w-max">
                    <h1 className="text-2xl font-semibold mb-1">My Stuff</h1>
                    <p className="text-sm">{currentTime}</p>
                </div>
                <Button
                    icon={
                        <i className="fa fa-plus-square" aria-hidden="true"></i>
                    }
                    onClick={() => dispatch(showModal(MODAL_ID.FORM))}
                >
                    Add
                </Button>
            </div>
            <div className="border-solid border-b border-gray-300 mt-4" />
        </div>
    );
};

export default PageHeader;
