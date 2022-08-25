import React from "react";

const Dot = ({ color, isClickable = false, isActive = true, handleChangeFilter }) => {
    const classBuilder = ({ color, isClickable, isActive }) => {
        let classes = [];

        switch (color) {
            case 'green':
                if (isClickable) classes.push("hover:bg-green-700");
                if (isActive) classes.push("bg-green-500"); else classes.push("border-green-500");
                break;
            case 'orange':
                if (isClickable) classes.push("hover:bg-orange-700");
                if (isActive) classes.push("bg-orange-500"); else classes.push("border-orange-500");
                break;
            case 'red':
                if (isClickable) classes.push("hover:bg-red-700");
                if (isActive) classes.push("bg-red-500"); else classes.push("border-red-500");
                break;
            case 'purple':
                if (isClickable) classes.push("hover:bg-purple-700");
                if (isActive) classes.push("bg-purple-500"); else classes.push("border-purple-500");
                break;
            case 'blue':
                if (isClickable) classes.push("hover:bg-blue-700");
                if (isActive) classes.push("bg-blue-500"); else classes.push("border-blue-500");
                break;
            case 'gray':
                if (isClickable) classes.push("hover:bg-gray-700");
                if (isActive) classes.push("bg-gray-500"); else classes.push("border-gray-500");
                break;
            default:
                if (isClickable) classes.push("hover:bg-gray-700");
                if (isActive) classes.push("bg-gray-500"); else classes.push("border-gray-500");
                break;
        }

        return classes;
    }

    const classes = [
        "p-1.5 mr-2 shadow-sm w-1 h-1 rounded-full border-2",
        ...classBuilder({color, isClickable, isActive})
    ];

    return <div
        className={ classes.join(" ") }
        onClick={() => {
            handleChangeFilter({ color, isActive: !isActive })
        }}>
    </div>;
};

export default Dot;