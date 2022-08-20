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

export default ContentFactory;