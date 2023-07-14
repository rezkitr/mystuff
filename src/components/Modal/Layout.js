import PropTypes from "prop-types";
import Button from "../Button";

const Layout = ({ children, title, confirmText, onClose, onSubmit }) => {
    return (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-900/30">
            <div className="max-w-lg max-h-full overflow-auto rounded p-6 bg-neutral-50">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">{title}</h3>
                    <div className="cursor-pointer" onClick={onClose}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="border-solid border-b border-gray-300 mt-2 mb-4" />
                {children}
                <div className="flex gap-2 justify-center mt-8">
                    <Button type="danger" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>{confirmText}</Button>
                </div>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    confirmText: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

Layout.defaultProps = {
    children: null,
    title: "",
    confirmText: "Add",
    onClose: () => {},
    onSubmit: () => {},
};

export default Layout;
