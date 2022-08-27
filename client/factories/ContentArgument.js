import React from "react";
import ContentFactory from "./ContentFactory";
import { contentBuilder, joinTag } from "../helpers";

class ContentArgument extends ContentFactory {
    getContent() {
        return (
            <>
                {this.data.content.map((value, key) => {
                    const content = contentBuilder({
                        id: `${this.data.id}-${key}`.toString(),
                        origin: this.data.origin,
                        meta: value.meta,
                        content: value.content,
                    });

                    return content.getContent();
                })}
            </>
        );
    }
}

export default ContentArgument;