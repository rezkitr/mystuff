import PropTypes from "prop-types";

const Button = ({ children, type, icon, onClick }) => {
    const bgStyle = {
        normal: "bg-gray-500",
        danger: "bg-red-500",
    };

    return (
        <div
            className={`rounded w-max p-2 flex items-center gap-2 text-white text-sm font-medium cursor-pointer ${bgStyle[type]}`}
            onClick={onClick}
        >
            {icon && <div>{icon}</div>}
            {children}
        </div>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    children: null,
    type: "normal",
    icon: null,
    onClick: () => {},
};

export default Button;
