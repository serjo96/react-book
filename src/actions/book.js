import {ADD_BOOK, ERROR_ADD_BOOK, CLEAN_FORM, FORM_BOOK, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK} from '../constants'

export const updateBookForm = ({ key, value, ...e }) => {
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

function addBook(){
    return {
        type: ADD_BOOK,
    };
}
function onErrorAddBook(data){
    return {
        type: ERROR_ADD_BOOK,
        data
    };
}
export function errorAddBook(data){
    return (dispatch) => {
        dispatch(onErrorAddBook(data));
        setTimeout(()=>  {
            dispatch(onErrorAddBook({ info: '', classInfo: '' }));
        }, 2500);
    }
}
function cleanForm(){
    return {
        type: CLEAN_FORM,
    };
}

export function deleteBook (bookID){
    return{
        type: DELETE_BOOK,
        bookID
    }
}
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

export function onAddBook(form) {
    return (dispatch) => {
        if (form.author.length === 0 || form.name.length === 0  || form.subtitle.length === 0 || !form.img.data) {
            dispatch(errorAddBook({info:'Заполните все поля и загрузите обложку!', classInfo:'dz-info dz-error'}));
        } else {
            dispatch(addBook());
            dispatch(cleanForm());
        }
    }
}
export  { onSelectBook, loadLocalData, changeBook};
