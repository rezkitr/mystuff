import { priceFormat } from "../utils/utils";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { remove } from "../redux/slices/stuffSlice";

const ItemCard = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-md">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-32 h-32" />
                <div>
                    <h5 className="mb-4 text-xl font-medium">{item.name}</h5>
                    <div className="flex flex-col gap-1 text-sm">
                        <p>Buy Price: {priceFormat(item.buyPrice)}</p>
                        <p>Sell Price: {priceFormat(item.sellPrice)}</p>
                        <p>Stock: {item.stock}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    icon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                />
                <Button
                    icon={<i className="fa fa-trash" aria-hidden="true"></i>}
                    type="danger"
                    onClick={() => dispatch(remove(item.id))}
                />
            </div>
        </div>
    );
};

export default ItemCard;