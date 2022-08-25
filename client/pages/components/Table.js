import React from "react";
import { contentBuilder } from "../../helpers";

const Table = ({ rows }) => {
    return (
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-200">
            <div className="bg-grey-100 min-h-screen">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 w-1/4">
                                Time
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Content
                            </th>
                        </tr>
                        </thead>
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
}

export default Table;