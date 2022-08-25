import React from "react";
import ContentFactory from "./ContentFactory";

class ContentString extends ContentFactory {
    getContent() {
        return (
            <div key={this.data.id}>
                <p className="text-black">{this.data.content.message}</p>
                <p>{this.getBacktrace()}</p>
            </div>
        );
    }
}

export default ContentString;