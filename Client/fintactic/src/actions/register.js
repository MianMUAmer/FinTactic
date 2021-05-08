import { toast } from "react-toastify";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return (dispatch) => {
    if (payload.creds.email.length > 0 && payload.creds.password.length > 0) {
      let opts = {
        email: payload.creds.email,
        password: payload.creds.password,
      };
      console.log(opts);
      fetch("/api/register", {
        method: "post",
        body: JSON.stringify(opts),
      })
        .then((r) => r.json())
        .then((response) => {
          if (response.success != "true") {
            console.log("Couldnt register!");
            toast.error("You've already registered!");
          } else {
            payload.history.push("/login");
            toast.success("You've been registered successfully!");
          }
        });
    } else {
      dispatch(registerError("Something was wrong. Try again"));
    }
  };
}
