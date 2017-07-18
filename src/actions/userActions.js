import {ADD_BOOK, DELETE_BOOK, TAKE_CHANGE_DATA, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'

const addBook = (book) => { return {type: ADD_BOOK, book}};

 const deleteBook = (bookID) => { return {type: DELETE_BOOK, bookID} };

 const takeChanges = (changedItem) => { return {type: TAKE_CHANGE_DATA, changedItem} };

 const loadLocalData = (localItems) => { return {type: LOAD_LOCAL_STORAGE_DATA, localItems} };

 const changeBook = (book) => { return {type: CHANGE_BOOK, book} };

 export  {addBook, deleteBook, takeChanges, loadLocalData, changeBook};