export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    if (creds.email.length > 0 && creds.password.length > 0) {
      let opts = {
        email: creds.email,
        password: creds.password,
      };
      fetch("/login", {
        method: "post",
        body: JSON.stringify(opts),
      })
        .then((r) => r.json())
        .then((response) => {
          if (response.currentuser != "invalid") {
            localStorage.setItem("authenticated", true);
            dispatch(receiveLogin());
            console.log(response.currentuser);
          } else {
            console.log("Please type in correct username/password");
            dispatch(
              loginError("Invalid email or password! Please try again.")
            );
          }
        });
    } else {
      dispatch(loginError("Something was wrong. Try Again Please"));
    }
  };
}
