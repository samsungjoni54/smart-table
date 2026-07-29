export function initFiltering(elements) {
    function updateIndexes(elements, indexes) {
        Object.keys(indexes).forEach(function(elementName) {
            const indexData = indexes[elementName];
            const options = Object.values(indexData).map(function(name) {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            });
            elements[elementName].append(...options);
        });
    }

    function applyFiltering(query, state, action) {
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            input.value = '';
            state[action.dataset.field] = '';
        }

        const filter = {};
        Object.keys(elements).forEach(function(key) {
            const element = elements[key];
            if (element) {
                const tag = element.tagName;
                if ((tag === 'INPUT' || tag === 'SELECT') && element.value) {
                    filter[`filter[${element.name}]`] = element.value;
                }
            }
        });

        if (Object.keys(filter).length > 0) {
            return Object.assign({}, query, filter);
        }
        return query;
    }

    return {
        updateIndexes: updateIndexes,
        applyFiltering: applyFiltering
    };
}
