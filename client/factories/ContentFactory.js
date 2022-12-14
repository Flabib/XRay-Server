import React from "react";
import Dot from "../pages/components/Dot";

class ContentFactory {
    constructor(data) {
        if (this.constructor === ContentFactory) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.data = data;
    }

    getTime() {
        return new Date(this.data.createdAt).toLocaleTimeString("en-US");
    }

    getBacktrace() {
        return this.data.origin.backtrace.split(/(\\|\/)/).pop().toString();
    }

    getContent() {
        throw new Error("Method 'getContent()' must be implemented.");
    }

    build() {
        return (
            <tr key={this.data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white align-top w-1/5">
                <span className="inline-flex items-center">
                    <Dot color={this.data.meta.color} />{this.getTime()}
                </span>
              </th>
              <td className="py-4 px-6">
                {this.getContent()}
              </td>
            </tr>
        );
    }
}

export default ContentFactory;