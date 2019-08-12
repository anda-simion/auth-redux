import fetch from "cross-fetch";
import { IAM_API } from "../../config";

export const register = (
    email,
    first_name,
    last_name,
    password,
    onRegisterSuccess,
    onRegisterError
  ) => {
      return dispatch => {
        dispatch(registrationInProgress());
        fetch(`${IAM_API}/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              u_name: email,
              f_name: first_name,
              l_name: last_name,
              pw: password,
              email: email,
              locale: "en_US",
              timezone: "Europe/Bucharest"
            })
        })
        .then(response => {
            if (response.status === 201) {
                dispatch(registrationFinalised());
                return response.json();
            } else {
            throw Error(
                JSON.stringify({
                status_code: response.status, 
                message: response.status === 409 ? "Cannot create 2 users with the same user name" : `Something when wrong during registration, status code: ${response.code}`
                })
            )
            }
        })
        .then(body => {
            onRegisterSuccess(email, password);
        })
        .catch(error => {
            let error_message = JSON.parse(error.message).message;
            onRegisterError(error_message);
        });
    }
};

export const registrationInProgress = _ => ({
    type: "REGISTRATION_IN_PROGRESS"
});

export const registrationFailed = _ => ({
    type: "REGISTRATION_FAILED"
});

export const registrationFinalised = _ => ({
    type: "REGISTRATION_FINALISED"
});