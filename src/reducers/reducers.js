

export default function rootReducer(state = [], action) {
    console.log(action);
    switch (action.type) {
        case  'BUTTON_CLICK':
            return [
                ...state,
                action.book
            ];
        case "DELETE_BOOK":
            console.log(state)
            return state.filter(({ id }) => id.id !== action.book);
    }
    return state;
}