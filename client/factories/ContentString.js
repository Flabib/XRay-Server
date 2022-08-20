import ContentFactory from "./ContentFactory";

class ContentString extends ContentFactory {
    getContent() {
        return `
            <p class="text-black">${this.data.content.message}</p>
            <p>${this.getBacktrace()}</p>
        `;
    }
}

export default ContentString;