

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

        case "TAKE_CHANGE_DATA":
            return Object.assign({}, state, {changesData: action.changedItem});

        case "LOAD_LOCAL_STORAGE_DATA":
            return Object.assign({}, state, {
                books: state.books.concat(action.localItems)
            });

        case "CHANGE_BOOK":
            const changedItem = action.book
            return Object.assign({}, state, {
                books: state.books.map(item => item.id === changedItem.id ? changedItem : item)
            });




        default:
            return state;
    }
}

