export const addValidationErrors = validation_errors => ({
    type: "ADD_VALIDATION_ERRORS",
    payload: validation_errors
});

export const removeValidationErrors = _ => ({
    type: "REMOVE_VALIDATION_ERRORS",
})