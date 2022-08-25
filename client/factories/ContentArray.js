import React from "react";
import ReactJson from 'react-json-view';
import ContentFactory from "./ContentFactory";

class ContentArray extends ContentFactory {
    getContent() {
        return (
            <div key={this.data.id}>
                <div className="bg-gray-100 rounded-md p-2">
                    <ReactJson
                        enableClipboard={false}
                        displayDataTypes={false}
                        src={this.data.content} />
                </div>
                <p>{this.getBacktrace()}</p>
            </div>
        );
    }
}

export default ContentArray;