import React from "react";
import Dot from "./Dot";

const InlineDot = ({ filter, handleChangeFilter }) => {
    return (
        <div className="flex justify-center p-4 bg-gray-50">
            {filter.map((dot) => {
                return <Dot
                    key={dot.color}
                    handleChangeFilter={handleChangeFilter}
                    color={dot.color}
                    isActive={dot.isActive}
                    isClickable={true}
                />
            })}
        </div>
    );
};

export default InlineDot;