function render(data, target) {
    var element = contentBuilder(data);

    target.insertAdjacentHTML('afterbegin', element.build());

    if (element.hasCallback()) {
        element.callback(element.data.id, element.data.content);
    }
}

function contentBuilder(data) {
    var contentProvider;

    switch (data.type) {
        case 'string':
            contentProvider = new ContentString(data);
            break;
        case 'array':
            contentProvider = new ContentArray(data);
            break;
        case 'argument':
            contentProvider = new ContentArgument(data);
            break;
    }

    return contentProvider
}

function joinTag(firstTag, secondTag) {
    if (firstTag === '') return secondTag;

    return `
        ${firstTag}
        ${secondTag}
    `;
}

class ContentFactory {
    constructor(data) {
        if (this.constructor === ContentFactory) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.data = data;
    }

    hasCallback() {
        return typeof this.callback === 'function';
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
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white align-top">
                ${this.getTime()}
              </th>
              <td class="py-4 px-6">
                ${this.getContent()}
              </td>
            </tr>
        `;
    }
}

class ContentString extends ContentFactory {
    getContent() {
        return `
            <p class="text-black">${this.data.content.message}</p>
            <p>${this.getBacktrace()}</p>
        `;
    }
}

class ContentArray extends ContentFactory {
    getContent() {
        return `
            <pre id="json-${this.data.id}" class="text-black bg-gray-100 rounded-md my-2"></pre>
            <p class="">${this.getBacktrace()}</p>
        `;
    }

    callback(...args) {
        $(`#json-${args[0]}`).jsonViewer(args[1]);
    }
}

class ContentArgument extends ContentFactory {
    callbacks = [];

    getContent() {
        var tags = ``, arrIndex = 0;

        this.data.content.forEach((argument) => {
            var content = contentBuilder({
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