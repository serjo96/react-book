import {ADD_BOOK, FORM_BOOK, CLEAN_FORM, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK, ERROR_ADD_BOOK, TAKE_CHANGE_DATA, CHANGES_FORM_BOOK, CLEAN_EDIT_FORM, DELETE_ALL_BOOK} from '../constants'
import update from 'react-addons-update';

const initialState = {
    books: [],
    selectBook: -1,
    addBook: {
        id: '',
        author: '',
        name: '',
        subtitle: '',
        img: {
            size: 0,
            name: '',
            data: null
        },
        error: {
            info: '',
            classInfo: ''
        }
    },
    changeBookFrom: {}
} ;
export default function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {

        case ADD_BOOK:
            return update(state, {
                    books: {
                        $push: [{
                            ...state.addBook,
                            id: Math.floor(Math.random() * (250 - 1) + 1)
                        }]
                    }
                });

        case FORM_BOOK:
            return update(state, {
                addBook: {
                    [action.key]: { $set: action.value }
                }
            });

        case CHANGES_FORM_BOOK:
            return update(state, {
                changeBookFrom: {
                    [action.key]: { $set: action.value }
                }
            });

        case TAKE_CHANGE_DATA:
            return  Object.assign({}, state, {
               changeBookFrom: action.data
            });


        case ERROR_ADD_BOOK:
            return update(state, {
                addBook: {
                    error: { $set: action.data }
                }
            });

        case CLEAN_FORM:
            return Object.assign({}, state, {
                addBook: {
                    author: '',
                    name: '',
                    subtitle: '',
                    img: {
                        size: 0,
                        name: '',
                        data: null
                    },
                    error: {
                        info: '',
                        classInfo: ''
                    }
                }
            });

        case CLEAN_EDIT_FORM:
            return Object.assign({}, state, {
                changeBookFrom: {}
            });

        case DELETE_BOOK:
            const books = state.books.filter(({ id }) => id !== action.bookID);
            return Object.assign({}, state,{
                books
            });

        case DELETE_ALL_BOOK:
            return Object.assign({}, state,{
                books: []
            });

        case SELECT_BOOK:
            return Object.assign({}, state, {selectBook: action.selectedBook});

        case LOAD_LOCAL_STORAGE_DATA:
            return Object.assign({}, state, {
                books: state.books.concat(action.localItems)
            });

        case CHANGE_BOOK:
            return update(state, {
                books: {
                    [action.itemData.index]: { $set: action.itemData}
                }
            });

        default:
            return state;
    }
}

