import {ADD_BOOK, CLEAN_FORM, FORM_BOOK, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'

export const updateBookForm = ({ key, value, ...e }) => {
	console.warn(e);
	if (!key) {
        return {
            type: FORM_BOOK,
            key: e.target.name,
            value: e.target.value
        };
	}
	return {
		type: FORM_BOOK,
		key,
        value
	};
};

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

 const changeBook = ({ key, value, index, ...e }) => {
     if (!key) {
         return {
             type: CHANGE_BOOK,
             key: e.target.name,
             value: e.target.value,
             index
         };
     }
     return {
         type: CHANGE_BOOK,
         key,
         value,
         index
     };
 };

 export  { deleteBook, onSelectBook, loadLocalData, changeBook};
