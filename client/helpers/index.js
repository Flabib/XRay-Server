import ContentString from '../factories/ContentString';
import ContentArray from '../factories/ContentArray';
import ContentArgument from '../factories/ContentArgument';

const contentBuilder = (data) => {
    let contentProvider;

    switch (data.meta.type) {
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

export { contentBuilder };