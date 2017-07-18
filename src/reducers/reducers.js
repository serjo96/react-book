import {ADD_BOOK, DELETE_BOOK, TAKE_CHANGE_DATA, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'
import update from 'react-addons-update';

export default function rootReducer(state = {books: []}, action) {
    console.log(action);
    switch (action.type) {
        case ADD_BOOK:
            return Object.assign({}, state, {
                books: [
                    ...state.books,
                    action.book
                ]
            });

        case DELETE_BOOK:
            const books = state.books.filter(({id}) => id !== action.bookID);
            return {books};

        case TAKE_CHANGE_DATA:
            return Object.assign({}, state, {changesData: action.changedItem});

        case LOAD_LOCAL_STORAGE_DATA:
            return Object.assign({}, state, {
                books: state.books.concat(action.localItems)
            });

        case CHANGE_BOOK:
            return update(state, {
                books: {
                    [action.book.index]: { $set: action.book}
                }
            });




        default:
            return state;
    }
}

