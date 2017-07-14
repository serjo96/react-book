 const addBook = (book) => { return {type: 'ADD_BOOK', book}};

 const deleteBook = (bookID) => { return {type: "DELETE_BOOK", bookID} };

 const takeChanges = (changedItem) => { return {type: "CHANGE_BOOK", changedItem} };

 const loadLocalData = (localItems) => { return {type: "LOAD_LOCAL_STORAGE_DATA", localItems} };

 export  {addBook, deleteBook, takeChanges, loadLocalData};