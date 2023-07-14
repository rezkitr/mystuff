import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

const ItemList = () => {
    const stuffs = useSelector((state) => state.stuff.data);

    if (!stuffs.length) {
        return (
            <div className="h-full flex flex-col gap-4 justify-center items-center">
                <i className="fa fa-info text-xl" aria-hidden="true"></i>
                <h3>No stuff here. Please add stuff first</h3>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {stuffs.map((stuff) => (
                <ItemCard key={stuff.id} item={stuff} />
            ))}
        </div>
    );
};

export default ItemList;
