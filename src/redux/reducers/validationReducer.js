const initial_state = {
    validation_errors: {}
}

const validationReducer = (state = initial_state, action) => {
    switch (action.type) {
        case "ADD_VALIDATION_ERRORS":
            return {
                ...state,
                validation_errors: action.payload
            };
        case "REMOVE_VALIDATION_ERRORS":
            return {
                ...state,
                validation_errors: {}
            };
        default:
            return state
    }
};

export default validationReducer;