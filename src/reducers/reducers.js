import {ADD_BOOK, FORM_BOOK, CLEAN_FORM, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'
import update from 'react-addons-update';

const initialState = {
    books: [],
    selectBook: -1,
    addBook: {
        id: '',
        author: '',
        name: '',
        imgUrl: '',
    }
} ;
export default function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ADD_BOOK:
            return update(state, {
                    books: {$push: [state.addBook]}
                });
        case FORM_BOOK:
            return update(state, {
                addBook: {
                    [action.key]: { $set: action.value}
                }
            });
        case CLEAN_FORM:
            return Object.assign({}, state, {
                addBook: {
                    id: '',
                    author: '',
                    name: '',
                    imgUrl: '',
                }
            });
        case DELETE_BOOK:
            const books = state.books.filter(({id}) => id !== action.bookID);
            return {books};

        case SELECT_BOOK:
            return Object.assign({}, state, {selectBook: action.selectedBook});

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

