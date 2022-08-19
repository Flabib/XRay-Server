import React from 'react';
import { io } from 'socket.io-client';

const App = () => {
    React.useEffect(() => {
        const socket = io('http://localhost:1945');

        socket.on('data', function (data) {
            render(data, document.getElementById("table-content"));
        });

        socket.on('all-data', function (datas) {
            datas.forEach((data) => {
                render(data, document.getElementById("table-content"));
            });
        });

        socket.emit('all-data');
    },[]);

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
                        <tbody id="table-content"/>
                    </table>
                </div>
            </div>
        </div>
    );
}

function render(data, target) {
    const element = contentBuilder(data);

    target.insertAdjacentHTML('afterbegin', element.build());

    if (element.hasCallback()) {
        element.callback(element.data.id, element.data.content);
    }
}

function contentBuilder(data) {
    let contentProvider;

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

export default App;