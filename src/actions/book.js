import {ADD_BOOK, CLEAN_FORM, FORM_BOOK, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'

export function updateBookForm(key, value){
	return {
		type: FORM_BOOK,
		key,
        value
	};
}
export function addBook(){
	return {
		type: ADD_BOOK,
	};
}
export function cleanForm(){
	return {
		type: CLEAN_FORM,
	};
}

 const deleteBook = (bookID) => ({type: DELETE_BOOK, bookID});

 const onSelectBook = (selectedBook) => { return {type: SELECT_BOOK, selectedBook} };

 const loadLocalData = (localItems) => { return {type: LOAD_LOCAL_STORAGE_DATA, localItems} };

 const changeBook = (book) => { return {type: CHANGE_BOOK, book} };

 export  { deleteBook, onSelectBook, loadLocalData, changeBook};
