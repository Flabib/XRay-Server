import ContentString from '../factories/ContentString';
import ContentArray from '../factories/ContentArray';
import ContentArgument from '../factories/ContentArgument';

const render = (data, target) => {
    const element = contentBuilder(data);

    target.insertAdjacentHTML('afterbegin', element.build());

    if (element.hasCallback()) {
        element.callback(element.data.id, element.data.content);
    }
};

const contentBuilder = (data) => {
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

    return contentProvider;
};

const joinTag = (firstTag, secondTag) => {
    if (firstTag === '') return secondTag;

    return `
        ${firstTag}
        ${secondTag}
    `;
};

export { render, contentBuilder, joinTag };