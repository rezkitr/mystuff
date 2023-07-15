import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import { add, setSelected, update } from "../../redux/slices/stuffSlice";
import { closeModal } from "../../redux/slices/modalSlice";
import Layout from "./Layout";
import { showToast } from "../../utils/utils";

const StuffForm = () => {
    const stuffs = useSelector((state) => state.stuff.data);
    const selectedStuff = useSelector((state) => state.stuff.selectedStuff);
    const dispatch = useDispatch();

    const schema = yup.object({
        image: yup
            .mixed()
            .required("Required!")
            .test("fileSize", "Max size 100KB!", (value) => {
                return value.length === 1 && value[0].size <= 100000;
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
        setValue,
        getValues,
        trigger,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    useEffect(() => {
        if (selectedStuff) {
            Object.entries(selectedStuff).forEach(([name, value]) =>
                setValue(name, value)
            );
            setValue("image", "");
        }
    }, [selectedStuff]);

    const watchImage = watch("image", "");

    const closeForm = () => {
        reset();
        dispatch(closeModal());
        if (selectedStuff) dispatch(setSelected(null));
    };

    const checkNameExist = (name) => {
        const isNameExist = stuffs.find(
            (stuff) => stuff.name.toLowerCase() === name.toLocaleLowerCase()
        );

        if (!isNameExist) {
            return false;
        } else {
            showToast.nameExist();
            return true;
        }
    };

    const onAdd = (payload) => {
        dispatch(add(payload));
        showToast.addSuccess();
        closeForm();
    };

    const onUpdate = (payload) => {
        dispatch(update(payload));
        showToast.updateSuccess();
        closeForm();
    };

    const onSubmit = async () => {
        const isValid = !selectedStuff
            ? await trigger()
            : await trigger(["name", "buyPrice", "sellPrice", "stock"]);

        if (isValid) {
            const formValues = getValues();

            if (!selectedStuff) {
                const payload = {
                    ...formValues,
                    id: uuidV4(),
                    image: URL.createObjectURL(formValues.image[0]),
                };
                const isNameExist = checkNameExist(formValues.name);
                if (!isNameExist) onAdd(payload);
            } else {
                const payload = {
                    ...formValues,
                    id: selectedStuff.id,
                    image:
                        formValues.image !== ""
                            ? URL.createObjectURL(formValues.image[0])
                            : selectedStuff.image,
                };

                if (formValues.name !== selectedStuff.name) {
                    const isNameExist = checkNameExist(formValues.name);
                    if (!isNameExist) onUpdate(payload);
                } else {
                    onUpdate(payload);
                }
            }
        }
    };

    return (
        <Layout
            title={`${selectedStuff ? "Edit" : "Add"} Stuff`}
            confirmText={selectedStuff ? "Save" : "Add"}
            onClose={closeForm}
            onSubmit={onSubmit}
        >
            <form>
                <div className="flex flex-col gap-2">
                    {((watchImage && watchImage.length === 1) ||
                        selectedStuff) && (
                        <div className="mb-2">
                            <img
                                src={
                                    selectedStuff && watchImage.length === 0
                                        ? selectedStuff.image
                                        : URL.createObjectURL(watchImage[0])
                                }
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
