import {ADD_BOOK, ERROR_ADD_BOOK, CLEAN_FORM, FORM_BOOK, DELETE_BOOK, SELECT_BOOK, LOAD_LOCAL_STORAGE_DATA, CHANGE_BOOK, TAKE_CHANGE_DATA, CHANGES_FORM_BOOK, CLEAN_EDIT_FORM, DELETE_ALL_BOOK} from '../constants'
import {textValidation} from '../utils/formsUtils';

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

export const updateChangeBookForm = ({ key, value, ...e }) => {
    if (!key) {
        return {
            type: CHANGES_FORM_BOOK,
            key: e.target.name,
            value: e.target.value
        };
    }
    return {
        type: CHANGES_FORM_BOOK,
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

function cleanEditForm(){
    return {
        type: CLEAN_EDIT_FORM,
    };
}

export function deleteBook (bookID){
    return{
        type: DELETE_BOOK,
        bookID
    }
}

export function deleteAllBook (){
    return{
        type: DELETE_ALL_BOOK,

    }
}


const onSelectBook = (selectedBook) => { return {type: SELECT_BOOK, selectedBook} };

export const changeBookData = (data) => {

        return {
            type: TAKE_CHANGE_DATA,
            data
        };

};

export const loadLocalData = (localItems) => { return {type: LOAD_LOCAL_STORAGE_DATA, localItems} };

const changeBook = (itemData) => {

        return {
            type: CHANGE_BOOK,
            itemData
        };

};

export function onAddBook(form) {
    console.log(form);
    return (dispatch) => {
        if (form.author.length === 0 || form.name.length === 0  || !form.img.data) {
            dispatch(errorAddBook({info:'Заполните все поля и загрузите обложку!', classInfo:'dz-info dz-error'}));
        } else {
            if(textValidation(form.author) || textValidation(form.name) || textValidation(form.subtitle)){
                if(!form.changeForm){
                    dispatch(addBook());
                    dispatch(cleanForm());
                }else{
                    dispatch(changeBook(form));
                    dispatch(cleanEditForm());
                }
            }
            else{
                dispatch(errorAddBook({info:'Допустимы только латинские символы.', classInfo:'dz-info dz-error'}));
            }
        }
    }
}
export  { onSelectBook};
