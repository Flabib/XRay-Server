import ContentFactory from "./ContentFactory";

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

export default ContentArray;