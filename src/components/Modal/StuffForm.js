import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import { add } from "../../redux/slices/stuffSlice";
import { closeModal } from "../../redux/slices/modalSlice";

const StuffForm = () => {
    const stuffs = useSelector((state) => state.stuff.data);
    const dispatch = useDispatch();

    const schema = yup.object({
        image: yup
            .mixed()
            .required("Required!")
            .test("fileSize", "Max size 100KB!", (value) => {
                return value[0] && value[0].size <= 100000;
            }),
        name: yup.string().required("Required!"),
        buyPrice: yup
            .number()
            .typeError("Must be a number!")
            .required("Required!"),
        sellPrice: yup
            .number()
            .typeError("Must be a number!")
            .required("Required!"),
        stock: yup
            .number()
            .typeError("Must be a number!")
            .required("Required!"),
    });

    const {
        register,
        getValues,
        trigger,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const watchImage = watch("image", undefined);

    const closeForm = () => {
        reset();
        dispatch(closeModal());
    };

    const onAdd = async () => {
        const isValid = await trigger();
        if (isValid) {
            const formValues = getValues();
            const isNameExist = stuffs.find(
                (stuff) =>
                    stuff.name.toLowerCase() ===
                    formValues.name.toLocaleLowerCase()
            );
            if (!isNameExist) {
                dispatch(
                    add({
                        ...formValues,
                        image: URL.createObjectURL(formValues.image[0]),
                        id: uuidV4(),
                    })
                );
                closeForm();
                toast("Stuff added successfully", {
                    autoClose: 2000,
                    type: "success",
                });
            } else {
                toast("Product name already exist", {
                    autoClose: 2000,
                    type: "warning",
                });
            }
        }
    };

    return (
        <Layout title="Add Stuff" onClose={closeForm} onSubmit={onAdd}>
            <form>
                <div className="flex flex-col gap-2">
                    {watchImage && watchImage[0] && (
                        <div className="mb-2">
                            <img
                                src={URL.createObjectURL(watchImage[0])}
                                alt="preview"
                                className="h-40 w-96"
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="file"
                            accept=".jpg,.png"
                            {...register("image")}
                        />
                        <p className="errorMsg">{errors.image?.message}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                        />
                        <p className="errorMsg">{errors.name?.message}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Buy price"
                            {...register("buyPrice")}
                        />
                        <p className="errorMsg">{errors.buyPrice?.message}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Sell price"
                            {...register("sellPrice")}
                        />
                        <p className="errorMsg">{errors.sellPrice?.message}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Stock"
                            {...register("stock")}
                        />
                        <p className="errorMsg">{errors.stock?.message}</p>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default StuffForm;
