export function initSearching(searchField) {
    return function(query, state, action) {
        const searchText = state[searchField];
        if (searchText) {
            const searchQuery = {
                search: searchText
            };
            return Object.assign({}, query, searchQuery);
        }
        return query;
    }
}
