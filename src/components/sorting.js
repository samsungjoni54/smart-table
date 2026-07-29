import {sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return function(query, state, action) {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;

            columns.forEach(function(column) {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        } else {
            columns.forEach(function(column) {
                if (column.dataset.value !== 'none') {
                    field = column.dataset.field;
                    order = column.dataset.value;
                }
            });
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null;

        if (sort) {
            const sortQuery = {
                sort: sort
            };
            return Object.assign({}, query, sortQuery);
        }
        return query;
    }
}
