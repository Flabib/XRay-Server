import React from "react";
import { contentBuilder } from "../../helpers";

const Table = ({ rows }) => {
    return (
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-200">
            <div className="bg-grey-100">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody id="table-content">
                            {rows.map((row) => {
                                return contentBuilder(row).build();
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;