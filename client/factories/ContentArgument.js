import ContentFactory from "./ContentFactory";
import { contentBuilder, joinTag } from "../helpers";

class ContentArgument extends ContentFactory {
    callbacks = [];

    getContent() {
        let tags = ``, arrIndex = 0;

        this.data.content.forEach((argument) => {
            const content = contentBuilder({
                id: `${this.data.id}-${arrIndex++}`.toString(),
                origin: this.data.origin,
                type: argument.type,
                content: argument.content,
            });

            console.log(content.constructor.name);

            tags = joinTag(tags, content.getContent());

            if (content.hasCallback()) this.callbacks.push({
                id: content.data.id,
                content: content.data.content,
                call: content.callback
            });
        });

        return tags;
    }

    callback(...args) {
        this.callbacks.forEach(({id, content, call}) => {
            call(id, content);
        })
    }
}

export default ContentArgument;