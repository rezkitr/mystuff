import { priceFormat } from "../utils/utils";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { showModal } from "../redux/slices/modalSlice";
import { setSelected } from "../redux/slices/stuffSlice";
import { MODAL_ID } from "../utils/enum";

const ItemCard = ({ item }) => {
    const dispatch = useDispatch();

    const onEdit = () => {
        dispatch(setSelected(item));
        dispatch(showModal(MODAL_ID.FORM));
    };

    const onDelete = () => {
        dispatch(setSelected(item));
        dispatch(showModal(MODAL_ID.DELETE_CONFIRM));
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-md">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-32 h-32" />
                <div>
                    <h5 className="mb-4 text-xl font-medium">{item.name}</h5>
                    <div className="flex flex-col text-sm">
                        <p>
                            Buy Price: <span className="font-medium text-base text-green-600">{priceFormat(item.buyPrice)}</span>
                        </p>
                        <p>Sell Price: <span className="font-medium text-base text-blue-800">{priceFormat(item.sellPrice)}</span></p>
                        <p>Stock: <span className="font-medium text-base text-yellow-600">{item.stock}</span></p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    icon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                    onClick={onEdit}
                />
                <Button
                    icon={<i className="fa fa-trash" aria-hidden="true"></i>}
                    type="danger"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default ItemCard;
