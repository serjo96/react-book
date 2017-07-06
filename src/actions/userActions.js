 const addBook = (book) => { return { type: 'BUTTON_CLICK', book} };

 const deleteBook = (payload) => { return {type: "DELETE_BOOK", payload} };

 export  {addBook, deleteBook};