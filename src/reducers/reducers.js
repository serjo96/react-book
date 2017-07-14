

export default function rootReducer(state = {books: []}, action) {
    console.log(action);
    switch (action.type) {
        case  'ADD_BOOK':
            return Object.assign({}, state, {
                books: [
                    ...state.books,
                    action.book
                ]
            });

        case "DELETE_BOOK":
            const books = state.books.filter(({id}) => id !== action.bookID);
            return {books};

        case "CHANGE_BOOK":
            return Object.assign({}, state, {changesData: action.changedItem});

        case "LOAD_LOCAL_STORAGE_DATA":
            return Object.assign({}, state, {
                books: state.books.concat(action.localItems)
            });

        default:
            return state;
    }
}

